import { useState, useEffect } from 'react';

export const useDocumentation = () => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const fetchDocs = async () => {
      // In a real application, this would fetch from a database or API
      const adminPanel = await import('../documentation/AdminPanel.jsx');
      const technicalDocs = await import('../documentation/TechnicalDocumentation.jsx');
      const deployment = await import('../documentation/Deployment.jsx');
      const customization = await import('../documentation/Customization.jsx');
      const codeLibraries = await import('../documentation/CodeLibrariesOverview.jsx');

      setDocs([
        { content: adminPanel.default().props.children },
        { content: technicalDocs.default().props.children },
        { content: deployment.default().props.children },
        { content: customization.default().props.children },
        { content: codeLibraries.default().props.children },
      ]);
    };

    fetchDocs();
  }, []);

  const getRelevantDocs = async (query) => {
    // In a real application, this would use a more sophisticated search algorithm
    return docs.filter(doc => 
      doc.content.toLowerCase().includes(query.toLowerCase())
    );
  };

  return { getRelevantDocs };
};