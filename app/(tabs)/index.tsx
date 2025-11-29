import { Redirect } from 'expo-router';

export default function InitialRedirect() {
  // redireciona para o grupo (drawer) -> tela index
  return <Redirect href={'/((tabs))/index' as any} />;
}