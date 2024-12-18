"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOff } from "lucide-react"; // Adicionando EyeOpenIcon

export function SignInForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState(""); // Adicionando estado para repetição da senha
  const [isLoading, setIsLoading] = useState(false);
  const [eyeOpen, setEyeOpen] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter(); // Inicializando o useRouter

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setError("");

    // Verificação das senhas
    if (password !== repeatPassword) {
      setError("As senhas não coincidem.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao fazer login");
      }

      // Armazenar o token no localStorage para autenticação em futuras requisições
      localStorage.setItem("token", data.token); // Armazenando o token retornado

      // Armazenar outras informações do usuário, se necessário
      localStorage.setItem("userId", data.id.toString());
      localStorage.setItem("userEmail", data.email);

      // Redirecionar para a página inicial ou outra página após o login
      router.push("/"); // Substitua com a página de destino desejada
    } catch (err: unknown) {
      // Especificando o tipo 'unknown'
      if (err instanceof Error) {
        setError(err.message); // Acessando 'message' do erro se for uma instância de Error
      } else {
        setError("Ocorreu um erro inesperado"); // Mensagem genérica em caso de tipo inesperado
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowPassword = () => {
    setEyeOpen(!eyeOpen);
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Faça login na sua conta</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Digite seu e-mail abaixo para acessar sua conta
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Nome completo</Label>
          <Input
            id="username"
            type="username"
            placeholder="ex: Anthony Farias"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            placeholder="nome@exemplo.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Senha</Label>
            <div
              onClick={handleShowPassword}
              className="ml-auto cursor-pointer"
            >
              {eyeOpen ? <EyeIcon size={20} /> : <EyeOff size={20} />}
            </div>
          </div>
          <Input
            id="password"
            type={eyeOpen ? "text" : "password"} // Alternando entre "text" e "password"
            placeholder="**********"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="repeatPassword">Repita a senha</Label>
          <Input
            id="repeatPassword"
            type={eyeOpen ? "text" : "password"} // Alternando entre "text" e "password"
            placeholder="**********"
            required
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Carregando..." : "Cadastrar"}
        </Button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
      <div className="text-center text-sm">
        Já tem uma conta?{" "}
        <a href="/login" className="underline underline-offset-4">
          Fazer login
        </a>
      </div>
    </form>
  );
}
