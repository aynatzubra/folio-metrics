import crypto from 'crypto'

export function createVisitorHash(ip: string, userAgent: string) {
  return crypto
    .createHash('sha256')
    .update(`${ip}:${userAgent}`)
    .digest('hex')
}