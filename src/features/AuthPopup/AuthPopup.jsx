import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Popup } from "../../components";
import { useAuth } from '../../contexts';

function AuthPopup({ isOpen, setIsOpen }) {
  const { supabase } = useAuth();

  return (
    <Popup
      isOpen={isOpen}
      onClose={() => { setIsOpen(false) }}
    >
      <Auth
        supabaseClient={supabase}
        showLinks={false}
        providers={[]}
        magicLink
        view='magic_link'
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: 'rgba(147 51 234)',
                brandAccent: 'rgba(126 34 206)',
              },
            },
          },
        }}
        localization={{
          variables: {
            magic_link: {
              email_input_label: 'Correo electrónico',
              email_input_placeholder: 'Tu correo',
              button_label: 'Enviar enlace mágico',
              loading_button_label: 'Enviando...',
              link_text: 'Iniciar sesión con enlace mágico',
              confirmation_text: '¡Revisa tu correo para el enlace mágico!',
            },
          },
        }}
      />
    </Popup>
  );
}
export default AuthPopup;