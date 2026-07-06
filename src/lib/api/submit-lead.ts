type SubmitLeadInput = {
  name: string;
  phone: string;
  note?: string;
};

type SubmitLeadResponse = {
  success: boolean;
  message: string;
};

export async function submitLead(input: SubmitLeadInput): Promise<SubmitLeadResponse> {
  const response = await fetch('/api/leads', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = (await response.json()) as SubmitLeadResponse;

  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Không thể gửi dữ liệu lúc này. Vui lòng thử lại sau.');
  }

  return data;
}
