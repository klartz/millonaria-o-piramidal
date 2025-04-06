import { Textarea, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../components";
import { useAuth } from "../../contexts";
import { getPromptUsage, submitPrompt, updatePromptUsage } from "../../services";
import "../../styles/Fields.css";
import "./Home.css";

function Home() {
  const { accountTier, userId } = useAuth();
  const [response, setResponse] = useState(null);
  const [promptsUsed, setPromptsUsed] = useState(0);
  const [remainingPrompts, setRemainingPrompts] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    const fetchPromptUsage = async () => {
      const promptUsage = await getPromptUsage(userId);
      setPromptsUsed(promptUsage);
    }

    if (userId) {
      fetchPromptUsage();
    }
  }, [userId])

  useEffect(() => {
    setRemainingPrompts(accountTier === "free" ? 1 - promptsUsed : "Ilimitados");
  }, [accountTier, promptsUsed]);

  const onSubmit = async ({ apiKey, prompt }) => {
    const AIresponse = await submitPrompt(apiKey, prompt);
    setResponse(AIresponse);
    await updatePromptUsage(userId);
    setPromptsUsed(promptsUsed + 1);
  };

  return (
    <div className="home">
      <header>
        <h1>¿Millonaria o piramidal?</h1>
        <p>¡Escribí tu idea de startup y nuestra IA te dirá si corresponde a una startup millonaria o una estafa piramidal!</p>
      </header>

      <div className="home--card-container">

        <div className="home--card">
          <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h2>Describí tu idea</h2>
            <TextInput
              label="Clave OpenAI API"
              withAsterisk
              {...register("apiKey", { required: "Este es un campo obligatorio" })}
              error={errors.apiKey ? errors.apiKey.message : null}
            />

            <Textarea
              label="Escribí tu idea"
              withAsterisk
              resize="none"
              minRows={4}
              maxRows={6}
              {...register("prompt", { required: "Este es un campo obligatorio" })}
              error={errors.prompt ? errors.prompt.message : null}
            />

            <Button type="submit" disabled={isSubmitting || remainingPrompts === 0}>
              {isSubmitting ? 'Evaluando tu idea...' : 'Evaluar'}
            </Button>
          </form>
        </div>

        <div className="home--card home--response">
          <h2>Tu resultado</h2>
          <div>
            { response ?
            <p>{response}</p>:
            <p>Acá aparecerá el resultado de evaluar tu idea</p>
            }
          </div>
        </div>

        <div className="home--card home--account-info">
          <h2>Tu cuenta</h2>
          <div>
            <span>
              <p>Tipo de cuenta:</p>
              <p>{accountTier}</p>
            </span>
            <span>
              <p>Intentos utilizados:</p>
              <p>{promptsUsed}</p>
            </span>
            <span>
              <p>Intentos restantes:</p>
              <p>{remainingPrompts}</p>
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
export default Home;