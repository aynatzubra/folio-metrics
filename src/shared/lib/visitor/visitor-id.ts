const VISITOR_ID_KEY = 'folio_visitor_id'

export const VisitorManager = {
  getOrCreateId(): string {
    if (typeof window === 'undefined') return 'server_session'

    let id = localStorage.getItem(VISITOR_ID_KEY)
    if (!id) {
      id = `vid_${Math.random().toString(36).substring(2, 11)}`
      localStorage.setItem(VISITOR_ID_KEY, id)
    }
    return id
  },
}