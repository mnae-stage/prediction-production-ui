import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BASE_URL_API } from "@/lib/constants";
import { useNavigate } from "react-router-dom";
import "@/style/login.css";

import { Mail, Lock, ArrowRight, Loader2, Eye, EyeOff } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// VALIDATION SCHEMAS
const registerSchema = z.object({
  firstname: z.string().min(2, "Prénom trop court"),
  lastname: z.string().min(2, "Nom trop court"),
  gender: z.string().min(1, "Choisissez un genre"),
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "6 caractères minimum"),
});

const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "6 caractères minimum"),
});

type RegisterValues = z.infer<typeof registerSchema>;
type LoginValues = z.infer<typeof loginSchema>;

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Un seul formulaire dynamique (login / register)
  const form = useForm<RegisterValues | LoginValues>({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
  });

  const onSubmit = async (data: any) => {
    setLoading(true);

    try {
      const url = isLogin
        ? `${BASE_URL_API}/auth/login`
        : `${BASE_URL_API}/auth/register`;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) throw new Error("Échec de la connexion");

      if (isLogin) {
          const result = await response.json();

      if (!result.accessToken || !result.refreshToken) {
        throw new Error("Token manquant dans la réponse");
      }
      sessionStorage.setItem("accessToken", result.accessToken);
      sessionStorage.setItem("refreshToken", result.refreshToken);
        navigate("/admin");
      } else {
        navigate("/auth");
        window.location.reload();
      }
    } catch (e: any) {
      alert("Erreur : " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const errors: any = form.formState.errors; 

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 overflow-hidden relative"
      style={{
        backgroundImage: "url('/gray.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-green-600/20 z-0" />

      <div className="w-full max-w-2xl relative animate-scale-in">
        <div className="bg-card/100 backdrop-blur-xl rounded-3xl border-border/50 overflow-hidden flex flex-col">

          {/* HEADER */}
          <div className="bg-gradient-to-r from-primary to-primary-dark w-full p-6 text-center relative">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-2 animate-bounce-slow">
              <img src="/public/mnae-logo.png" alt="RizPredict Logo" />
            </div>
            <h1 className="text-2xl font-display font-bold text-white mb-1">
              RizPredict
            </h1>
            <p className="text-white/80 text-sm">
              Prédiction intelligente de production rizicole
            </p>
          </div>

          {/* SWITCH LOGIN / REGISTER */}
          <div className="flex p-2 m-4 mb-2 bg-muted/50 rounded-2xl">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${isLogin ? "bg-card text-foreground shadow-md" : "text-muted-foreground"
                }`}
            >
              Connexion
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${!isLogin ? "bg-card text-foreground shadow-md" : "text-muted-foreground"
                }`}
            >
              Inscription
            </button>
          </div>

          {/* FORM */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 flex-1 space-y-3">

            {/* INSCRIPTION */}
            {!isLogin && (
              <div className="flex flex-wrap gap-4 items-end">
                <div className="flex-1 min-w-[30%]">
                  <Label>Prénom</Label>
                  <Input {...form.register("firstname")} placeholder="Prénom" className="h-12" />
                  <p className="text-sm text-destructive">{errors.firstname?.message}</p>
                </div>

                <div className="flex-1 min-w-[30%]">
                  <Label>Nom</Label>
                  <Input {...form.register("lastname")} placeholder="Nom" className="h-12" />
                  <p className="text-sm text-destructive">{errors.lastname?.message}</p>
                </div>

                <div className="flex-1 min-w-[30%]">
                  <Label>Genre</Label>
                  <select
                    {...form.register("gender")}
                    className="h-12 rounded-xl border border-border/50 bg-background/50 px-3 w-full"
                  >
                    <option value="">Sélectionner</option>
                    <option value="M">Homme</option>
                    <option value="F">Femme</option>
                  </select>
                  <p className="text-sm text-destructive">{errors.gender?.message}</p>
                </div>
              </div>
            )}

            {/* EMAIL + MOT DE PASSE */}
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[45%] space-y-1">
                <Label>Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 text-muted-foreground" />
                  <Input
                    {...form.register("email")}
                    type="email"
                    placeholder="email@exemple.com"
                    className="pl-10 h-12"
                  />
                </div>
                <p className="text-sm text-destructive">{errors.email?.message}</p>
              </div>

              <div className="flex-1 min-w-[45%] space-y-1">
                <Label>Mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 text-muted-foreground" />
                  <Input
                    {...form.register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-12 h-12"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Eye /> : <EyeOff />}
                  </button>
                </div>
                <p className="text-sm text-destructive">{errors.password?.message}</p>
              </div>
            </div>

            {/* SUBMIT */}
            <Button disabled={loading} className="w-full h-12 rounded-xl flex justify-center items-center gap-2">
              {loading ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : isLogin ? (
                "Se connecter"
              ) : (
                "Créer mon compte"
              )}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </Button>
          </form>

          {/* FOOTER */}
          <div className="p-4 text-center text-sm text-muted-foreground">
            {isLogin ? "Pas encore de compte ?" : "Déjà inscrit ?"}{" "}
            <button onClick={() => setIsLogin(!isLogin)} className="text-primary font-medium">
              {isLogin ? "Créer un compte" : "Se connecter"}
            </button>
          </div>
        </div>

        {/* RETOUR */}
        <div className="text-center mt-4">
          <a href="/" className="text-sm text-yellow-900 hover:text-foreground inline-flex items-center gap-2">
            <ArrowRight className="w-4 h-4 rotate-180" />
            Retour à l'accueil
          </a>
        </div>
      </div>
    </div>
  );
};

export default Auth;
