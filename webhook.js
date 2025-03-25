export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)
    const method = request.method

    const verifyToken = "9387fudhfu982374i98w930" // 🔁 troque por seu token
    const powerAutomateUrl = "https://prod-11.brazilsouth.logic.azure.com:443/workflows/5595971f7e6448c6a762ce371330537e/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=sZRpEVJ8rbo8DGt22INq9yexkBFQsGZSkVLkx5tD2wA" // 🔁 troque pela URL real

    if (method === "GET") {
      const mode = url.searchParams.get("hub.mode")
      const token = url.searchParams.get("hub.verify_token")
      const challenge = url.searchParams.get("hub.challenge")

      if (mode === "subscribe" && token === verifyToken) {
        return new Response(challenge, { status: 200 })
      } else {
        return new Response("Token inválido", { status: 403 })
      }
    }

    if (method === "POST") {
      const body = await request.text()

      // Reencaminha o conteúdo para o Power Automate
      const response = await fetch(powerAutomateUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body
      })

      return new Response("Mensagem redirecionada ao Power Automate", { status: 200 })
    }

    return new Response("Método não permitido", { status: 405 })
  }
}
