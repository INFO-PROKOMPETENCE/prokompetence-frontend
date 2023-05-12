export const ConnectorAsInstance = () => {
  return (target: any, propertyKey: string) => {
    target[propertyKey] = () => new target();
    return target[propertyKey];
  };
};
