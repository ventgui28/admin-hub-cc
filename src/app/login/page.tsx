import { login } from './actions'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Bike } from "lucide-react"

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string }
}) {
  return (
    <div className="flex min-h-screen items-center justify-center p-6 relative overflow-hidden bg-background">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/30 rounded-full blur-[160px] pointer-events-none animate-pulse opacity-50" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[160px] pointer-events-none animate-pulse delay-1000 opacity-50" />
      
      {/* Aura Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,var(--color-primary)_0%,transparent_70%)] opacity-[0.03] pointer-events-none" />

      <div className="w-full max-w-[480px] space-y-8 md:space-y-12 relative z-10 animate-reveal">
        <div className="flex flex-col items-center text-center space-y-6 md:space-y-8">
          <div className="flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-[1.8rem] md:rounded-[2rem] bg-primary text-white shadow-2xl shadow-primary/40 ring-4 md:ring-8 ring-white/10 backdrop-blur-xl rotate-6 hover:rotate-0 transition-all duration-700 cursor-pointer group">
            <Bike className="h-10 w-10 md:h-12 md:w-12 group-hover:scale-110 transition-transform" />
          </div>
          <div className="space-y-2 md:space-y-3">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground uppercase italic leading-none text-gradient">
              Cantanhede <span className="text-primary/40 not-italic font-thin mx-1">/</span> Cycling
            </h1>
            <p className="text-muted-foreground font-black uppercase tracking-[0.4em] md:tracking-[0.5em] text-[9px] md:text-[11px] opacity-50">
              Private Management Hub
            </p>
          </div>
        </div>

        <Card className="hyper-glass border-white/20 p-0 overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] rounded-[2rem] md:rounded-[2.5rem] ring-1 ring-white/20">
          <div className="h-1.5 md:h-2 bg-primary w-full shadow-[0_4px_12px_rgba(var(--color-primary),0.3)]" />
          <CardHeader className="px-6 md:px-12 pt-8 md:pt-12 pb-6 md:pb-8 text-center space-y-3 md:space-y-4">
            <CardTitle className="text-3xl md:text-4xl font-black tracking-tighter italic uppercase text-gradient">Bem-vindo de Volta</CardTitle>
            <CardDescription className="text-muted-foreground font-medium uppercase tracking-[0.2em] text-[9px] md:text-[10px]">
              Autenticação segura para o centro de operações
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 md:px-12 pb-8 md:pb-12">
            <form action={login} className="space-y-8 md:space-y-10">
              <div className="space-y-3 md:space-y-4">
                <Label htmlFor="email" className="font-black text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-primary/70 ml-2">Email de Operador</Label>
                <div className="relative group">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="teu@email.com"
                    required
                    className="h-14 md:h-16 bg-white/40 dark:bg-black/40 border-white/20 dark:border-white/10 focus-visible:ring-primary rounded-xl md:rounded-2xl text-sm md:text-base font-bold transition-all shadow-inner px-5 md:px-6 group-hover:bg-white/60 dark:group-hover:bg-black/60"
                  />
                </div>
              </div>
              <div className="space-y-3 md:space-y-4">
                <Label htmlFor="password" title="password" className="font-black text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-primary/70 ml-2">Chave de Acesso</Label>
                <div className="relative group">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    className="h-14 md:h-16 bg-white/40 dark:bg-black/40 border-white/20 dark:border-white/10 focus-visible:ring-primary rounded-xl md:rounded-2xl text-sm md:text-base transition-all shadow-inner px-5 md:px-6 group-hover:bg-white/60 dark:group-hover:bg-black/60"
                  />
                </div>
              </div>
              
              {searchParams.error && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] p-4 md:p-5 rounded-xl md:rounded-2xl text-center animate-reveal">
                  Credenciais de acesso inválidas.
                </div>
              )}

              <Button type="submit" className="btn-premium w-full h-16 md:h-18 text-sm md:text-base shadow-primary/30">
                Aceder à Plataforma
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="flex flex-col items-center gap-4 md:gap-6">
          <p className="text-center text-[10px] md:text-[11px] font-black uppercase tracking-[0.5em] md:tracking-[0.6em] text-muted-foreground/30">
            Ultra-Premium Admin Platform • 2026
          </p>
          <div className="h-1 w-12 md:h-1.5 md:w-16 bg-primary/10 rounded-full" />
        </div>
      </div>


      {/* Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  )
}

