// @ts-expect-error - Module resolution handled by monorepo root
import { Server } from "socket.io"
import { Server as HttpServer } from "http"

export class SocketServer {
  private static instance: SocketServer
  private io: any

  private constructor(server: HttpServer) {
    this.io = new Server(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    })

    this.initializeEvents()
  }

  public static getInstance(server?: HttpServer): SocketServer {
    if (!SocketServer.instance && server) {
      SocketServer.instance = new SocketServer(server)
    }
    return SocketServer.instance
  }

  private initializeEvents() {
    this.io.on("connection", (socket: any) => {
      console.log(`Neural Link Established: ${socket.id}`)

      socket.on("presence:sync", (data: { userId: string }) => {
        socket.broadcast.emit("presence:update", {
          userId: data.userId,
          status: "ONLINE",
          timestamp: new Date()
        })
      })

      socket.on("disconnect", () => {
        console.log(`Neural Link Severed: ${socket.id}`)
      })
    })
  }

  public emitSystemAlert(message: string) {
    this.io.emit("system:alert", { message, type: "NEURAL_SYNC" })
  }
}
