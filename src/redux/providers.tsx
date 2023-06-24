import { FC, PropsWithChildren, ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "./store";


export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>

  )
}

