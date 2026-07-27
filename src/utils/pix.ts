export interface PixPayloadParams {
  pixKey: string;
  merchantName: string;
  merchantCity: string;
  amount: number;
  txid: string;
}

function crc16CCITT(data: string): string {
  let crc = 0xffff;
  for (let i = 0; i < data.length; i++) {
    crc ^= data.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if (crc & 0x8000) {
        crc = ((crc << 1) ^ 0x1021);
      } else {
        crc <<= 1;
      }
      crc &= 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

function formatValue(value: number): string {
  return value.toFixed(2);
}

function formatLenValue(text: string): string {
  const len = text.length.toString().padStart(2, '0');
  return len + text;
}

export function gerarPixPayload(params: PixPayloadParams): string {
  const { pixKey, merchantName, merchantCity, amount, txid } = params;

  const payloadSemCRC =
    '000201' +
    '26' + formatLenValue('0014BR.GOV.BCB.PIX' + '01' + formatLenValue(pixKey)) +
    '52040000' +
    '5303986' +
    '54' + formatLenValue(formatValue(amount)) +
    '5802BR' +
    '59' + formatLenValue(merchantName.substring(0, 25)) +
    '60' + formatLenValue(merchantCity.substring(0, 15)) +
    '62' + formatLenValue('05' + formatLenValue(txid.substring(0, 25))) +
    '6304';

  const crc = crc16CCITT(payloadSemCRC);
  return payloadSemCRC + crc;
}

export function gerarQrCodePix(payload: string, size: number = 220): string {
  const encoded = encodeURIComponent(payload);
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encoded}&bgcolor=ffffff&color=000000&qzone=2`;
}