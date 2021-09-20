const setEmit = (type, payload) => {
  return ({
    type,
    payload
  })
}

export const emit = {
  setEmit
}