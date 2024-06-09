export function storeState(key: string, state: any) {
  localStorage.setItem(key, JSON.stringify(state));
}

export function loadState(key: string, defaultState: any) {
  const stateInStorage = localStorage.getItem(key);
  if (!stateInStorage) return defaultState;
  try {
    return JSON.parse(stateInStorage);
  } catch {
    return defaultState;
  }
}


  export function loadAuthState() {
    const defaultState = { id: 0 ,role:" "};
    const authStateInStorage = localStorage.getItem("auth");
    if (!authStateInStorage) return defaultState;
    try {
      return JSON.parse(authStateInStorage);
    } catch {
      return defaultState;
    }
  }

  export function storeToken(token?:any){

    if(token){

        localStorage.setItem('token',JSON.stringify(token))
    }else{
        localStorage.removeItem('token');
    }
}



export function loadToken(){
    const tokenInString=localStorage.getItem('token');
    if(!tokenInString)return null;

    try {

        return JSON.parse(tokenInString)
    } catch {
        return null;
    }
}