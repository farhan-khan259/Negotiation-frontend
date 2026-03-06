const API_URL = "http://localhost:8000/api/v1";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const startNegotiation = async (setupData) => {
  try {
    const payload = {
      ...setupData,
      supplier_name: setupData?.supplierName ?? setupData?.supplier_name,
    };
    const response = await fetch(`${API_URL}/negotiation/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody.detail || "Failed to start negotiation");
    }

    return await response.json();
  } catch (error) {
    console.error("Error starting negotiation:", error);
    throw error;
  }
};

const sendMessage = async (negotiationId, message) => {
  try {
    const response = await fetch(`${API_URL}/negotiation/${negotiationId}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody.detail || "Failed to send message");
    }

    return await response.json();
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

const getNegotiationSummary = async (negotiationId) => {
  try {
    const response = await fetch(`${API_URL}/negotiation/${negotiationId}`, {
      method: "GET",
      headers: {
        ...getAuthHeaders(),
      },
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody.detail || "Failed to load negotiation summary");
    }

    return await response.json();
  } catch (error) {
    console.error("Error loading negotiation summary:", error);
    throw error;
  }
};

const downloadTranscript = async (negotiationId) => {
  const response = await fetch(`${API_URL}/negotiation/${negotiationId}/transcript`, {
    method: "GET",
    headers: {
      ...getAuthHeaders(),
    },
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.detail || "Failed to download transcript");
  }

  return await response.blob();
};

export const negotiationService = {
  startNegotiation,
  sendMessage,
  getNegotiationSummary,
  downloadTranscript,
};

// Also export individual functions for backward compatibility
export { startNegotiation, sendMessage, getNegotiationSummary, downloadTranscript };