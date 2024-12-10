export interface LoginProps {
    setUsuario: (usuario: string) => void;
  }
  
  export interface ConfiguracionUsuarioProps {
    metaDiaria: number | null;
    setMetaDiaria: (meta: number) => void;
  }
  
  export interface PanelPrincipalProps {
    consumoDiario: number;
    setConsumoDiario: (consumo: number) => void;
    metaDiaria: number;
    handleLogout: () => void;
  }