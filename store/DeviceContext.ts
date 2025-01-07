import React from 'react'

export const DeviceContext = React.createContext<DeviceInfo>({
  isMobile: false,
})

export interface DeviceInfo {
  isMobile: boolean
}
