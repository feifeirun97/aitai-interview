//an action includes type and payload
export const changeT1 = (tIndex) => {
  return (dispatch) => {
    dispatch({
      type: "selectT1",
      payload: tIndex
    })
  }
}
export const changeT2 = (tIndex) => {
  return (dispatch) => {
    dispatch({
      type: "selectT2",
      payload: tIndex
    })
  }
}
