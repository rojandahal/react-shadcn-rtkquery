import React from "react";

type Props<T> = {
  list: T[];
  render: (item: T) => React.ReactNode;
};

export default function Each<T>({ list, render }: Props<T>) {
  return React.Children.toArray(list.map(render));
}
