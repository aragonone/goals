import React from 'react'
import { DownloadButton } from './DownloadButton'

export const DownloadGoals = ({ name, ratings }) => (
  <div
    css={`
      display: flex;
      align-items: center;
    `}
  >
    <DownloadButton filename={`goals-ratings-${name}.json`} data={ratings}>
      Download
    </DownloadButton>
    <div
      css={`
        margin-left: 40px;
      `}
    >
      Download your ratings and transmit the file to the person that asked you
      to fill them.
    </div>
  </div>
)
