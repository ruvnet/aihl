from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import Optional

class WalletBase(BaseModel):
    user_id: UUID
    balance: float = 0.0

class WalletCreate(WalletBase):
    pass

class WalletOut(WalletBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class TransactionBase(BaseModel):
    wallet_id: UUID
    amount: float
    type: str

class TransactionCreate(TransactionBase):
    pass

class TransactionOut(TransactionBase):
    id: UUID
    timestamp: datetime

    class Config:
        from_attributes = True