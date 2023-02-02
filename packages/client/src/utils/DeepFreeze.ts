function DeepFreeze<T>(obj: T) {
  const properties = Object.getOwnPropertyNames(obj);
  properties.forEach((prop) => {
    const value = (obj as any)[prop];
    if (value && typeof value === "object") {
      DeepFreeze(value);
    }
  });
  return Object.freeze(obj);
}

export default DeepFreeze;
