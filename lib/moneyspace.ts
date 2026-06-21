/**
 * MoneySpace Payment Client
 *
 * MoneySpace (https://www.moneyspace.net) เป็น payment gateway ไทยที่รองรับ:
 * - Credit Card (Visa, MasterCard, JCB)
 * - PromptPay QR Code
 * - Installment (KTC, BAY, FCY)
 *
 * การใช้งาน:
 * 1. สมัครที่ https://www.moneyspace.net
 * 2. ไปที่เมนู Webhooks เพื่อรับ secret_id และ secret_key
 * 3. ใส่ credentials ใน .env.local
 *
 * หมายเหตุ: เนื่องจาก MoneySpace ไม่เปิดเผย API docs สาธารณะ
 * โค้ดนี้อิงจากรูปแบบทั่วไปของ Thai Payment Gateways
 * อาจต้องปรับ endpoint ให้ตรงกับ API จริงหลังได้รับ credentials
 */

interface MoneySpaceConfig {
  secretId: string;
  secretKey: string;
  baseUrl: string;
}

interface CreatePaymentParams {
  amount: number; // จำนวนเงิน (สตางค์) เช่น 10000 = 100 บาท
  currency?: string; // ค่าเริ่มต้น THB
  description: string;
  orderId: string; // รหัสอ้างอิงภายในระบบของคุณ
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  redirectUrl?: string;
  webhookUrl?: string;
  paymentMethod?: "qr" | "creditcard" | "installment";
  installmentMonths?: number; // สำหรับผ่อนชำระ
}

interface MoneySpacePaymentResponse {
  id: string;
  status: "pending" | "paid" | "failed" | "cancelled";
  amount: number;
  currency: string;
  qrCodeUrl?: string; // สำหรับ QR Payment
  paymentUrl?: string; // สำหรับ Credit Card 3D Secure redirect
  expiresAt?: string;
  createdAt: string;
}

class MoneySpaceClient {
  private config: MoneySpaceConfig;

  constructor(config: MoneySpaceConfig) {
    this.config = config;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.config.baseUrl}${endpoint}`;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-Secret-Id": this.config.secretId,
      "X-Secret-Key": this.config.secretKey,
      ...(options.headers as Record<string, string>),
    };

    const res = await fetch(url, {
      ...options,
      headers,
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`MoneySpace API error: ${res.status} - ${error}`);
    }

    return res.json() as Promise<T>;
  }

  /**
   * สร้างรายการชำระเงิน
   */
  async createPayment(
    params: CreatePaymentParams
  ): Promise<MoneySpacePaymentResponse> {
    const body = {
      amount: params.amount,
      currency: params.currency || "THB",
      description: params.description,
      merchant_order_id: params.orderId,
      customer_name: params.customerName,
      customer_phone: params.customerPhone,
      customer_email: params.customerEmail,
      redirect_url: params.redirectUrl,
      webhook_url: params.webhookUrl,
      payment_method: params.paymentMethod || "qr",
      installment_months: params.installmentMonths,
    };

    return this.request<MoneySpacePaymentResponse>("/payments", {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  /**
   * ตรวจสอบสถานะการชำระเงิน
   */
  async checkPaymentStatus(
    paymentId: string
  ): Promise<MoneySpacePaymentResponse> {
    return this.request<MoneySpacePaymentResponse>(`/payments/${paymentId}`);
  }

  /**
   * ยกเลิกรายการชำระเงิน
   */
  async cancelPayment(paymentId: string): Promise<MoneySpacePaymentResponse> {
    return this.request<MoneySpacePaymentResponse>(`/payments/${paymentId}/cancel`, {
      method: "POST",
    });
  }
}

/**
 * สร้าง MoneySpace client จาก environment variables
 */
export function createMoneySpaceClient(): MoneySpaceClient | null {
  const secretId = process.env.MONEYSPACE_SECRET_ID;
  const secretKey = process.env.MONEYSPACE_SECRET_KEY;
  const baseUrl =
    process.env.MONEYSPACE_API_URL || "https://api.moneyspace.net/v1";

  if (!secretId || !secretKey) {
    console.warn("MoneySpace credentials not configured");
    return null;
  }

  return new MoneySpaceClient({ secretId, secretKey, baseUrl });
}

export type {
  MoneySpaceConfig,
  CreatePaymentParams,
  MoneySpacePaymentResponse,
  MoneySpaceClient,
};

export { MoneySpaceClient };
