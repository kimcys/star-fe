export type ConsentAction = 'accept' | 'decline';

export interface ConsentStatusResponse {
  success: boolean;
  shouldShowBanner: boolean;
}

export interface AcceptResultData {
  guid: string;
  version: number;
  consented_at: string;
}

export interface ConsentActionResponse {
  success: boolean;
  action: ConsentAction;
  data?: AcceptResultData;
}

export interface ConsentLog {
  guid: string;
  consent_status: 'accepted' | 'declined';
  consent_version: number;
  consented_at: string;
  ip_address: string | null;
  created_at: string;
}
