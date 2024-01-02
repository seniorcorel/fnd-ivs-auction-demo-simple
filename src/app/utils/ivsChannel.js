import fetchClient from "./fetchClient"

export const getChatToken = async (userId) => {
  const { chatTokenInfo } = await fetchClient(`/chatToken`, userId, 'POST')

  if (!chatTokenInfo) return null
  chatTokenInfo.sessionExpirationTime = new Date(chatTokenInfo.sessionExpirationTime)
  chatTokenInfo.tokenExpirationTime = new Date(chatTokenInfo.tokenExpirationTime)
  return chatTokenInfo
}