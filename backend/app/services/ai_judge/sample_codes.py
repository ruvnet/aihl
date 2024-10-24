code1 = '''
from collections import deque
from functools import singledispatchmethod
from typing import Annotated, Any, ClassVar, TypeVar

from lionabc.exceptions import LionValueError
from lionfuncs import LN_UNDEFINED, copy, time
from pydantic import Field, field_serializer, field_validator
from pydantic.fields import FieldInfo
from pydantic_core import PydanticUndefined
from typing_extensions import override

from lion_core._class_registry import get_class
from lion_core.converter import Converter
from lion_core.generic.component_converter import ComponentConverterRegistry
from lion_core.generic.element import Element
from lion_core.generic.note import Note

T = TypeVar("T", bound=Element)

DEFAULT_SERIALIZATION_INCLUDE: set[str] = {
    "ln_id",
    "timestamp",
    "metadata",
    "content",
    "embedding",
}


NAMED_FIELD = Annotated[str, Field(..., alias="field")]


class Component(Element):
    """Extended base class for components in the Lion framework."""

    metadata: Note = Field(
        default_factory=Note,
        description="Additional metadata for the component",
    )

    content: Any = Field(
        default=None,
        description="The main content of the Component",
    )

    embedding: list[float] = Field(default_factory=list)

    extra_fields: dict[str, Any] = Field(default_factory=dict)

    _converter_registry: ClassVar = ComponentConverterRegistry

    @field_serializer("metadata")
    def _serialize_metadata(self, value):
        return value.to_dict()

    @field_serializer("extra_fields")
    def _serialize_extra_fields(
        self,
        value: dict[str, FieldInfo],
    ) -> dict[str, Any]:
        """Custom serializer for extra fields."""
        output_dict = {}
        for k in value.keys():
            k_value = self.__dict__.get(k)
            output_dict[k] = k_value
        return output_dict

    @field_validator("extra_fields")
    def _validate_extra_fields(cls, value: Any) -> dict[str, FieldInfo]:
        """Custom validator for extra fields."""
        if not isinstance(value, dict):
            raise LionValueError("Extra fields must be a dictionary")

        out_ = {}
        for k, v in value.items():
            out_[k] = Field(**v) if isinstance(v, dict) else v

        return out_

    @property
    def all_fields(self) -> dict[str, FieldInfo]:
        """
        Get all fields including model fields and extra fields.

        Returns:
            dict[str, FieldInfo]: A dictionary containing all fields.
        """
        return {**self.model_fields, **self.extra_fields}

    def add_field(
        self,
        field_name: NAMED_FIELD,
        /,
        value: Any = LN_UNDEFINED,
        annotation: Any = LN_UNDEFINED,
        field_obj: FieldInfo = LN_UNDEFINED,
        **kwargs,
    ) -> None:
        """
        Add a new field to the component's extra fields.

        Args:
            field_name: The name of the field to add.
            value: The value of the field.
            annotation: Type annotation for the field.
            field_obj: A pre-configured FieldInfo object.
            **kwargs: Additional keyword arguments for Field configuration.

        Raises:
            LionValueError: If the field already exists.
        """
        if field_name in self.all_fields:
            raise LionValueError(f"Field '{field_name}' already exists")

        self.update_field(
            field_name,
            value=value,
            annotation=annotation,
            field_obj=field_obj,
            **kwargs,
        )

    # when updating field, we do not check the validity of annotation
    # meaning current value will not get validated, and can lead to
    # errors when storing and loading if you change annotation to a type
    # that is not compatible with the current value
    def update_field(
        self,
        field_name: NAMED_FIELD,
        /,
        value: Any = LN_UNDEFINED,
        annotation: Any = LN_UNDEFINED,
        field_obj: FieldInfo | Any = LN_UNDEFINED,
        **kwargs,
    ) -> None:
        """
        Update an existing field or create a new one if it doesn't exist.

        Args:
            field_name: The name of the field to update or create.
            value: The new value for the field.
            annotation: Type annotation for the field.
            field_obj: A pre-configured FieldInfo object.
            **kwargs: Additional keyword arguments for Field configuration.

        Raises:
            ValueError: If both 'default' and 'default_factory' are
                        provided in kwargs.
        """

        # pydanitc Field object cannot have both default and default_factory
        if "default" in kwargs and "default_factory" in kwargs:
            raise ValueError(
                "Cannot provide both 'default' and 'default_factory'",
            )

        # handle field_obj
        if field_obj is not LN_UNDEFINED:
            if not isinstance(field_obj, FieldInfo):
                raise ValueError(
                    "Invalid field_obj, should be a pydantic FieldInfo object"
                )
            self.extra_fields[field_name] = field_obj

        # handle kwargs
        if kwargs:
            if field_name in self.all_fields:  # existing field
                for k, v in kwargs.items():
                    self.field_setattr(field_name, k, v)
            else:
                self.extra_fields[field_name] = Field(**kwargs)

        # handle no explicit defined field
        if field_obj is LN_UNDEFINED and not kwargs:
            if field_name not in self.all_fields:
                self.extra_fields[field_name] = Field()

        field_obj = self.all_fields[field_name]

        # handle annotation
        if annotation is not LN_UNDEFINED:
            field_obj.annotation = annotation
        if not field_obj.annotation:
            field_obj.annotation = Any

        # handle value
        if value is LN_UNDEFINED:
            if getattr(self, field_name, LN_UNDEFINED) is not LN_UNDEFINED:
                value = getattr(self, field_name)

            elif getattr(field_obj, "default") is not PydanticUndefined:
                value = field_obj.default

            elif getattr(field_obj, "default_factory"):
                value = field_obj.default_factory()

        setattr(self, field_name, value)
        self._add_last_update(field_name)

    def _add_last_update(self, field_name: str, /) -> None:
        current_time = time()
        self.metadata.set(["last_updated", field_name], current_time)

    @override
    def to_dict(self, **kwargs: Any) -> dict:
        """
        Convert the component to a dictionary representation.

        Args:
            **kwargs: Additional arguments to pass to model_dump.

        Returns:
            dict[str, Any]: A dictionary representation of the component.
        """
        dict_ = self.model_dump(**kwargs)
        if isinstance(self.content, Note):
            dict_["content"] = dict_["content"]["content"]
        extra_fields = dict_.pop("extra_fields", {})
        dict_ = {**dict_, **extra_fields, "lion_class": self.class_name()}
        for i in list(dict_.keys()):
            if dict_[i] is LN_UNDEFINED:
                dict_.pop(i)
        return dict_

    def to_note(self, **kwargs: Any) -> Note:
        return Note(**self.to_dict(**kwargs))

    @override
    @classmethod
    def from_dict(cls, data: dict, /, **kwargs: Any) -> T:
        """
        Create a component instance from a dictionary.

        Args:
            data: The dictionary containing component data.
            **kwargs: Additional arguments for Pydantic model validation.

        Returns:
            T: An instance of the Component class or its subclass.
        """
        input_data = copy(data)
        if "lion_class" in input_data:
            cls = get_class(input_data.pop("lion_class"))
        if cls.from_dict.__func__ != Component.from_dict.__func__:
            return cls.from_dict(input_data, **kwargs)

        extra_fields = {}
        for k, v in list(input_data.items()):
            if k not in cls.model_fields:
                extra_fields[k] = input_data.pop(k)
        obj = cls.model_validate(input_data, **kwargs)
        for k, v in extra_fields.items():
            obj.update_field(k, value=v)

        metadata = copy(data.get("metadata", {}))
        last_updated = metadata.get("last_updated", None)
        if last_updated is not None:
            obj.metadata.set(["last_updated"], last_updated)
        else:
            obj.metadata.pop(["last_updated"], None)
        return obj

    @override
    def __setattr__(self, field_name: str, value: Any) -> None:
        if field_name == "metadata":
            raise AttributeError("Cannot directly assign to metadata.")
        elif field_name == "extra_fields":
            raise AttributeError("Cannot directly assign to extra_fields")
        if field_name in self.extra_fields:
            object.__setattr__(self, field_name, value)
        else:
            super().__setattr__(field_name, value)

        self._add_last_update(field_name)

    @override
    def __getattr__(self, field_name: str) -> Any:
        if field_name in self.extra_fields:
            default_ = self.extra_fields[field_name].default
            if default_ is not PydanticUndefined:
                return default_
            return LN_UNDEFINED

        cls_name = self.__class__.__name__
        raise AttributeError(
            f"'{cls_name}' object has no attribute '{field_name}'",
        )

    @override
    def __str__(self) -> str:
        """Return a concise string representation of the component."""
        content_preview = str(self.content)[:50]
        if len(content_preview) == 50:
            content_preview += "..."

        output_str = (
            f"{self.__class__.__name__}("
            f"ln_id={self.ln_id[:8]}..., "
            f"timestamp={str(self.created_datetime)[:-6]}, "
            f"content='{content_preview}', "
            f"metadata_keys={list(self.metadata.keys())}, "
        )

        for i, j in self.model_dump().items():
            if i not in DEFAULT_SERIALIZATION_INCLUDE:
                if isinstance(j, dict):
                    output_str += f"{i}={list(j.keys())}, "
                elif isinstance(j, str):
                    j_preview = j[:50]
                    if len(j_preview) == 50:
                        j_preview = j_preview + "..."
                    output_str += f"{i}={j_preview}, "
                else:
                    output_str += f"{i}={j}, "

        output_str += f"extra_fields_keys={list(self.extra_fields.keys())})"

        return output_str

    @override
    def __repr__(self) -> str:
        """Return a detailed string representation of the component."""

        def truncate_dict(
            d: dict[str, Any], max_items: int = 5, max_str_len: int = 50
        ) -> dict[str, Any]:
            items = list(d.items())[:max_items]
            truncated = {
                k: (
                    v[:max_str_len] + "..."
                    if isinstance(v, str) and len(v) > max_str_len
                    else v
                )
                for k, v in items
            }
            if len(d) > max_items:
                truncated["..."] = f"({len(d) - max_items} more items)"
            return truncated

        content_repr = repr(self.content)
        if len(content_repr) > 100:
            content_repr = content_repr[:97] + "..."

        dict_ = self.model_dump()
        extra_fields = dict_.pop("extra_fields", {})

        repr_str = (
            f"{self.class_name()}("
            f"ln_id={repr(self.ln_id)}, "
            f"timestamp={str(self.created_datetime)[:-6]}, "
            f"content={content_repr}, "
            f"metadata={truncate_dict(self.metadata.content)}, "
        )

        for i, j in dict_.items():
            if i not in DEFAULT_SERIALIZATION_INCLUDE:
                if isinstance(j, dict):
                    repr_str += f"{i}={truncate_dict(j)}, "
                elif isinstance(j, str):
                    j_repr = j
                    if len(j) > 100:
                        j_repr = j[:97] + "..."
                    repr_str += f"{i}={j_repr}, "
                else:
                    repr_str += f"{i}={j}, "

        repr_str += f"extra_fields={truncate_dict(extra_fields)})"
        return repr_str

    # converter methods
    @classmethod
    def list_converters(cls) -> list[str]:
        """List all registered converters."""
        return cls._get_converter_registry().list_obj_keys()

    @classmethod
    def _get_converter_registry(cls) -> ComponentConverterRegistry:
        """Get the converter registry for the class."""
        if isinstance(cls._converter_registry, type):
            cls._converter_registry = cls._converter_registry()
        return cls._converter_registry

    def convert_to(self, obj_key: str, /, **kwargs: Any) -> Any:
        """Convert the component to a specified type"""
        return self._get_converter_registry().convert_to(
            self,
            obj_key,
            **kwargs,
        )

    @classmethod
    def convert_from(
        cls, obj: Any, obj_key: str = None, /, **kwargs: Any
    ) -> T:
        """Convert data to create a new component instance"""
        data = cls._get_converter_registry().convert_from(
            cls,
            obj,
            obj_key,
            **kwargs,
        )
        return cls.from_dict(data)

    @classmethod
    def register_converter(cls, converter: type[Converter]) -> None:
        """Register a new converter."""
        cls._get_converter_registry().register(converter)

    # field management methods
    def field_setattr(
        self,
        field_name: str,
        attr: Any,
        value: Any,
        /,
    ) -> None:
        """Set the value of a field attribute."""
        all_fields = self.all_fields
        if field_name not in all_fields:
            raise KeyError(f"Field {field_name} not found in object fields.")
        field_obj = all_fields[field_name]
        if hasattr(field_obj, attr):
            setattr(field_obj, attr, value)
        else:
            if not isinstance(field_obj.json_schema_extra, dict):
                field_obj.json_schema_extra = {}
            field_obj.json_schema_extra[attr] = value

    def field_hasattr(
        self,
        field_name: str,
        attr: str,
        /,
    ) -> bool:
        """Check if a field has a specific attribute."""
        all_fields = self.all_fields
        if field_name not in all_fields:
            raise KeyError(f"Field {field_name} not found in object fields.")
        field_obj = all_fields[field_name]
        if hasattr(field_obj, attr):
            return True
        elif isinstance(field_obj.json_schema_extra, dict):
            if field_name in field_obj.json_schema_extra:
                return True
        else:
            return False

    def field_getattr(
        self,
        field_name: str,
        attr: str,
        default: Any = LN_UNDEFINED,
        /,
    ) -> Any:
        """Get the value of a field attribute."""
        if str(attr).strip("s").lower() == "annotation":
            return self._field_annotation(field_name)

        all_fields = self.all_fields
        if field_name not in all_fields:
            raise KeyError(f"Field {field_name} not found in object fields.")
        field_obj = all_fields[field_name]

        # check fieldinfo attr

        value = getattr(field_obj, attr, LN_UNDEFINED)
        if value is not LN_UNDEFINED:
            return value
        else:
            if isinstance(field_obj.json_schema_extra, dict):
                value = field_obj.json_schema_extra.get(attr, LN_UNDEFINED)
                if value is not LN_UNDEFINED:
                    return value

        # undefined attr
        if default is not LN_UNDEFINED:
            return default
        else:
            raise AttributeError(
                f"field {field_name} has no attribute {attr}",
            )

    def field_annotation(self, field_name: Any, /) -> dict[str, Any]:
        """Get the annotation of a field."""
        return self._field_annotation(field_name)

    @singledispatchmethod
    def _field_annotation(self, field_name: Any, /) -> dict[str, Any]:
        """
        Get field annotation for a given field.

        Args:
            field: The field to get annotation for.

        Returns:
            A dictionary containing the field annotation.
        """
        return {}

    @_field_annotation.register(str)
    def _(self, field_name: str, /) -> dict[str, Any]:
        dict_ = {field_name: self.all_fields[field_name].annotation}
        for _f, _anno in dict_.items():
            if "|" in str(_anno):
                _anno = str(_anno)
                _anno = _anno.split("|")
                dict_[_f] = [str(i).lower().strip() for i in _anno]
            else:
                dict_[_f] = [_anno.__name__] if _anno else None
        return dict_

    @_field_annotation.register(deque)
    @_field_annotation.register(set)
    @_field_annotation.register(list)
    @_field_annotation.register(tuple)
    def _(self, field_name, /) -> dict[str, Any]:
        dict_ = {}
        for f in field_name:
            dict_.update(self._field_annotation(f))
        return dict_


__all__ = ["Component"]

# File: lion_core/generic/component.py
'''


code2 = """
import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id">

function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }

import { useState } from 'react';

export const useConversation = () => {
  const [conversationState, setConversationState] = useState({
    isActive: false,
    type: '',
    voice: '',
    phoneNumber: '',
  });

  const startConversation = (type, voice, phoneNumber) => {
    setConversationState({
      isActive: true,
      type,
      voice,
      phoneNumber,
    });
    // Here you would integrate with your phone call service
    console.log(`Starting ${type} conversation with ${voice} voice on ${phoneNumber}`);
  };

  return {
    conversationState,
    startConversation,
  };
};

import React, { useState, useEffect } from 'react';
import { ConversationTypeSelector } from '@/components/ConversationTypeSelector';
import { VoiceSelector } from '@/components/VoiceSelector';
import { PhoneCallIntegration } from '@/components/PhoneCallIntegration';
import { useConversation } from '@/hooks/useConversation';
import { Tabs } from '@/components/Tabs';
import { PromptManagement } from '@/components/PromptManagement';
import { Settings } from '@/components/Settings';
import { Documentation } from '@/components/Documentation';
import { getPrompt, getPromptTypes, INTERVIEW_PROMPTS } from '@/data/interviewPrompts';
import { startCall } from '@/api/blandApi';
import { toast } from 'sonner';
import { DynamicIntentConfig } from '@/components/DynamicIntentConfig';
import { CheckCircle } from 'lucide-react';
import axios from 'axios';

const Index = () => {
  const [activeTab, setActiveTab] = useState('MainUI');
  const { startConversation, conversationState } = useConversation();
  const [interviewType, setInterviewType] = useState('default');
  const [voice, setVoice] = useState('nat');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [externalTools, setExternalTools] = useState([]);
  const promptTypes = getPromptTypes();

  useEffect(() => {
    const storedPhoneNumber = localStorage.getItem('userPhoneNumber');
    if (storedPhoneNumber) {
      setPhoneNumber(storedPhoneNumber);
    }
  }, []);

  const handleStartConversation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const toastId = toast.loading('Connecting...');
      const result = await startCall(phoneNumber, interviewType, voice, externalTools);
      toast.dismiss(toastId);
      
      // Assume success unless there's a specific error
      if (result) {
        toast.success(
          <div className="flex items-center">
            <CheckCircle className="text-green-500 mr-2" />
            Successfully Connected
          </div>
        );
        startConversation(interviewType, voice, phoneNumber);
      } else {
        toast.error('Failed to connect. Please check your API key and try again.');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && (error.response.status === 401 || error.response.status === 404)) {
          toast.error(`Error ${error.response.status}: ${error.response.data.message || 'API error'}`);
        } else {
          toast.error('An unexpected error occurred. Please try again.');
        }
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
      console.error('Error in handleStartConversation:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="container mx-auto max-w-md w-full">
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800">AI Conversation Bot</h1>
          <h2 className="text-base text-gray-600 subheader">Phone-Based AI-Powered Assistant for<br />Mock Interviews and Personal Guidance</h2>
        </div>

        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="tabcontainer">
          {activeTab === 'MainUI' && (
            <div className="bg-white shadow-md rounded px-6 py-8 mb-4">
              <p className="mb-6 text-gray-700 text-sm sm:text-base">
                Refine your skills with our AI-powered phone call system. Choose an interview type, select a voice, and enter your phone number to start an interactive AI conversation.
              </p>
              <form onSubmit={handleStartConversation} className="mb-6">
                <ConversationTypeSelector onSelect={setInterviewType} promptTypes={promptTypes} selectedType={interviewType} />
                <VoiceSelector onSelect={setVoice} />
                <PhoneCallIntegration onPhoneNumberChange={setPhoneNumber} />
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Start Call
                </button>
              </form>
            </div>
          )}

          {activeTab === 'PromptManagement' && <PromptManagement prompts={INTERVIEW_PROMPTS} />}
          {activeTab === 'Settings' && <Settings />}
          {activeTab === 'Documentation' && <Documentation />}
        </div>

        <p className="text-center text-gray-500 text-xs">
          &copy; AI Conversation Bot. No rights reserved, Go Crazy 🤪<br />
          Created by <a href="https://github.com/ruvnet/voicebot" className="text-blue-500 hover:text-blue-700">ruv | Open Source Code</a>
        </p>
      </div>
    </div>
  );
};

export default Index;

import React from 'react';

interface ConversationTypeSelectorProps {
  onSelect: (type: string) => void;
  promptTypes: string[];
  selectedType: string;
}

export const ConversationTypeSelector: React.FC<ConversationTypeSelectorProps> = ({ onSelect, promptTypes = [], selectedType }) => {
  return (
    <div className="mb-6">
      <label htmlFor="interview_type" className="block text-gray-700 text-sm font-bold mb-2">Select Interview Type:</label>
      <select
        id="interview_type"
        onChange={(e) => onSelect(e.target.value)}
        value={selectedType}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="default">Default</option>
        {promptTypes.filter(type => type !== 'default').map((type) => (
          <option key={type} value={type}>
            {type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </option>
        ))}
      </select>
    </div>
  );
};

import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Documentation: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Documentation</h1>
      
      <Tabs defaultValue="introduction">
        <TabsList>
          <TabsTrigger value="introduction">Introduction</TabsTrigger>
          <TabsTrigger value="setup">Setup</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value="introduction">
          <Accordion type="single" collapsible>
            <AccordionItem value="overview">
              <AccordionTrigger>Overview</AccordionTrigger>
              <AccordionContent>
                <p>AI Conversation Bot is a powerful tool designed to facilitate phone-based AI-powered conversations for mock interviews and personal guidance. It leverages advanced AI technology to provide realistic and interactive experiences.</p>
                <p>Key benefits include:</p>
                <ul className="list-disc pl-5 mt-2">
                  <li>Practice interviews in a realistic setting</li>
                  <li>Receive personalized guidance and feedback</li>
                  <li>Improve communication skills</li>
                  <li>Prepare for various professional scenarios</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="key-features">
              <AccordionTrigger>Key Features</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5">
                  <li>AI-powered phone conversations with natural language processing</li>
                  <li>Customizable prompts for various scenarios (interviews, counseling, etc.)</li>
                  <li>Multiple voice options with adjustable characteristics</li>
                  <li>Seamless integration with phone systems</li>
                  <li>Advanced settings for fine-tuning conversations</li>
                  <li>Real-time conversation analysis and feedback</li>
                  <li>Multi-step task configuration for complex scenarios</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
        
        <TabsContent value="setup">
          <Accordion type="single" collapsible>
            <AccordionItem value="api-setup">
              <AccordionTrigger>API Setup</AccordionTrigger>
              <AccordionContent>
                <p>To use the AI Conversation Bot, you need to obtain an API key from Bland AI. Follow these steps:</p>
                <ol className="list-decimal pl-5">
                  <li>Visit the Bland AI website (https://www.bland.ai)</li>
                  <li>Sign up for an account or log in</li>
                  <li>Navigate to the API section in your dashboard</li>
                  <li>Generate a new API key</li>
                  <li>Copy the API key and keep it secure</li>
                </ol>
                <p className="mt-2">Once you have your API key, enter it in the Settings tab of the application under "API Configuration".</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="installation">
              <AccordionTrigger>Installation</AccordionTrigger>
              <AccordionContent>
                <p>To install and run the AI Conversation Bot locally:</p>
                <ol className="list-decimal pl-5">
                  <li>Clone the repository from GitHub: <code>git clone https://github.com/ruvnet/voicebot.git</code></li>
                  <li>Navigate to the project directory: <code>cd voicebot</code></li>
                  <li>Install dependencies: <code>npm install</code></li>
                  <li>Create a <code>.env</code> file and add your API key: <code>BLAND_API_KEY=your_api_key_here</code></li>
                  <li>Start the application: <code>npm start</code></li>
                </ol>
                <p className="mt-2">The application should now be running on <code>http://localhost:3000</code>.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
        
        <TabsContent value="features">
          <Accordion type="single" collapsible>
            <AccordionItem value="prompt-management">
              <AccordionTrigger>Prompt Management</AccordionTrigger>
              <AccordionContent>
                <p>The Prompt Management feature allows you to customize and create new conversation prompts:</p>
                <ul className="list-disc pl-5">
                  <li>Select from pre-defined prompt types (e.g., job interview, counseling session)</li>
                  <li>Edit existing prompts to tailor them to your specific needs</li>
                  <li>Create new custom prompts for unique scenarios</li>
                  <li>Save and manage your prompts for future use</li>
                </ul>
                <p className="mt-2">To access Prompt Management:</p>
                <ol className="list-decimal pl-5">
                  <li>Click on the "Prompts" tab in the main interface</li>
                  <li>Select a prompt type or create a new one</li>
                  <li>Use the text editor to modify the prompt content</li>
                  <li>Click "Save Prompt" to store your changes</li>
                </ol>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="voice-selection">
              <AccordionTrigger>Voice Selection</AccordionTrigger>
              <AccordionContent>
                <p>Choose from a variety of AI voices for your conversations:</p>
                <ul className="list-disc pl-5">
                  <li>Multiple voice options with different characteristics (gender, accent, tone)</li>
                  <li>Preview voices before starting a conversation</li>
                  <li>Adjust voice settings like speed and pitch (in advanced settings)</li>
                </ul>
                <p className="mt-2">To select a voice:</p>
                <ol className="list-decimal pl-5">
                  <li>Go to the main interface</li>
                  <li>Find the "Voice Selection" dropdown</li>
                  <li>Choose your preferred voice from the list</li>
                  <li>Click the preview button to hear a sample</li>
                  <li>Adjust advanced voice settings if needed (in Settings tab)</li>
                </ol>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="phone-integration">
              <AccordionTrigger>Phone Integration</AccordionTrigger>
              <AccordionContent>
                <p>Seamlessly integrate with phone systems for realistic conversations:</p>
                <ul className="list-disc pl-5">
                  <li>Enter your phone number to receive calls</li>
                  <li>Set up webhooks for call events (in advanced settings)</li>
                  <li>Configure call settings like duration and recording options</li>
                </ul>
                <p className="mt-2">To set up phone integration:</p>
                <ol className="list-decimal pl-5">
                  <li>Go to the main interface</li>
                  <li>Enter your phone number in the designated field</li>
                  <li>Click on the Settings tab</li>
                  <li>Under "Call Settings", configure options like max duration and recording preferences</li>
                  <li>If using webhooks, enter the webhook URL in the advanced settings</li>
                </ol>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
        
        <TabsContent value="advanced">
          <Accordion type="single" collapsible>
            <AccordionItem value="custom-prompts">
              <AccordionTrigger>Creating Custom Prompts</AccordionTrigger>
              <AccordionContent>
                <p>To create a custom prompt:</p>
                <ol className="list-decimal pl-5">
                  <li>Go to the "Prompts" tab</li>
                  <li>Click "Add New Prompt"</li>
                  <li>Enter a name for your prompt</li>
                  <li>Write or paste your custom prompt text</li>
                  <li>Use variables like {'{user_name}'} or {'{company}'} for dynamic content</li>
                  <li>Click "Save" to add the prompt to your library</li>
                </ol>
                <p className="mt-2">Tips for effective prompts:</p>
                <ul className="list-disc pl-5">
                  <li>Be clear and specific about the scenario</li>
                  <li>Include instructions for the AI's behavior and tone</li>
                  <li>Specify any particular questions or topics to cover</li>
                  <li>Consider adding follow-up questions or branching paths</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="voice-customization">
              <AccordionTrigger>Customizing Voice Settings</AccordionTrigger>
              <AccordionContent>
                <p>To customize voice settings:</p>
                <ol className="list-decimal pl-5">
                  <li>Go to the Settings tab</li>
                  <li>Find the "Voice Settings" section</li>
                  <li>Adjust parameters such as:</li>
                  <ul className="list-disc pl-5">
                    <li>Speed: Control how fast the AI speaks</li>
                    <li>Pitch: Adjust the voice pitch higher or lower</li>
                    <li>Volume: Set the overall volume of the voice</li>
                    <li>Accent: Choose regional accents (if available)</li>
                  </ul>
                  <li>Use the "Test Voice" button to preview changes</li>
                  <li>Save your custom voice profile for future use</li>
                </ol>
                <p className="mt-2">Note: Available voice customization options may vary depending on the selected voice model.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="conversation-flow">
              <AccordionTrigger>Customizing Conversation Flow</AccordionTrigger>
              <AccordionContent>
                <p>To customize the conversation flow:</p>
                <ol className="list-decimal pl-5">
                  <li>Go to the Settings tab</li>
                  <li>Find the "Conversation Flow" section</li>
                  <li>Adjust settings such as:</li>
                  <ul className="list-disc pl-5">
                    <li>Response Time: Set how quickly the AI responds</li>
                    <li>Interruption Handling: Choose how the AI deals with interruptions</li>
                    <li>Topic Switching: Configure how easily the AI changes topics</li>
                    <li>Conversation Length: Set target duration or number of exchanges</li>
                  </ul>
                  <li>Use the "Dynamic Intent Configuration" to create custom conversation paths</li>
                  <li>Set up "Multi-Step Tasks" for complex conversation scenarios</li>
                </ol>
                <p className="mt-2">Experiment with these settings to create more natural and varied conversations.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="dynamic-intent">
              <AccordionTrigger>Dynamic Intent Configuration</AccordionTrigger>
              <AccordionContent>
                <p>Fine-tune the AI's understanding and responses with dynamic intents:</p>
                <ul className="list-disc pl-5">
                  <li>Create custom intents for specific conversation scenarios</li>
                  <li>Define keywords and priorities for each intent</li>
                  <li>Set up complex conversation flows and decision trees</li>
                </ul>
                <p className="mt-2">To configure dynamic intents:</p>
                <ol className="list-decimal pl-5">
                  <li>Go to the Settings tab</li>
                  <li>Find the "Dynamic Intent Configuration" section</li>
                  <li>Click "Add New Intent"</li>
                  <li>Enter a name and description for the intent</li>
                  <li>Add keywords that trigger this intent</li>
                  <li>Set the priority level (higher numbers take precedence)</li>
                  <li>Define the AI's response or action for this intent</li>
                  <li>Save the new intent</li>
                </ol>
                <p className="mt-2">Use dynamic intents to create more contextually aware and responsive conversations.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="external-tools">
              <AccordionTrigger>External Tool Integration</AccordionTrigger>
              <AccordionContent>
                <p>Enhance conversations with external tool integrations:</p>
                <ul className="list-disc pl-5">
                  <li>Connect to external APIs for real-time data</li>
                  <li>Integrate with CRM systems or databases</li>
                  <li>Use external services for additional processing or analysis</li>
                </ul>
                <p className="mt-2">To set up external tool integration:</p>
                <ol className="list-decimal pl-5">
                  <li>Go to the Settings tab</li>
                  <li>Find the "External Tool Integration" section</li>
                  <li>Click "Add New Tool"</li>
                  <li>Enter the tool name and description</li>
                  <li>Provide the API endpoint URL</li>
                  <li>Set up authentication (API key, OAuth, etc.)</li>
                  <li>Define input parameters and expected output</li>
                  <li>Create triggers or conditions for using the tool</li>
                  <li>Test the integration before saving</li>
                </ol>
                <p className="mt-2">External tools can significantly expand the capabilities of your AI conversations.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="analytics">
              <AccordionTrigger>Conversation Analytics</AccordionTrigger>
              <AccordionContent>
                <p>Gain insights from your AI conversations with advanced analytics:</p>
                <ul className="list-disc pl-5">
                  <li>View detailed conversation logs and transcripts</li>
                  <li>Analyze conversation duration, topics, and sentiment</li>
                  <li>Generate reports on conversation performance and user engagement</li>
                  <li>Track custom metrics and KPIs</li>
                </ul>
                <p className="mt-2">To access and use conversation analytics:</p>
                <ol className="list-decimal pl-5">
                  <li>Go to the Analytics tab in the main interface</li>
                  <li>Select the date range for analysis</li>
                  <li>Choose from available report types:
                    <ul className="list-disc pl-5">
                      <li>Conversation Overview</li>
                      <li>Topic Analysis</li>
                      <li>Sentiment Trends</li>
                      <li>User Engagement Metrics</li>
                      <li>Custom Reports (if configured)</li>
                    </ul>
                  </li>
                  <li>Use filters to focus on specific conversation types or users</li>
                  <li>Export data or reports for further analysis</li>
                </ol>
                <p className="mt-2">Use these analytics to continuously improve your AI conversations and measure their effectiveness.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
      </Tabs>
    </div>
  );
};
"""
