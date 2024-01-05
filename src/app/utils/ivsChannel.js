export const getChatToken = async (userId) => {
  const result = await fetch('/api/chatToken', {
    method: 'POST',
    body: JSON.stringify({ isAdmin: userId === 'admin' })
  })
  const chatTokenInfo = await result.json()

  if (!chatTokenInfo) return null
  chatTokenInfo.sessionExpirationTime = new Date(chatTokenInfo.sessionExpirationTime)
  chatTokenInfo.tokenExpirationTime = new Date(chatTokenInfo.tokenExpirationTime)
  return chatTokenInfo
}