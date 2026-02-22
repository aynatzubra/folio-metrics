import crypto from 'crypto'

export function createFingerprint(ip: string, userAgent: string) {
  return crypto
    .createHash('sha256')
    .update(`${ip}:${userAgent}`)
    .digest('hex')
}