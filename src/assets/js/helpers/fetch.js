export function status( response ) {
  if ( response.status !== 200 ) {
    return Promise.reject( new Error( response.statusText ) )
  }

  return Promise.resolve( response )
}

export function json( response ) {
  return response.json()
}
