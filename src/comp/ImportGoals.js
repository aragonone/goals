import React, { useCallback } from 'react'
import Dropzone from 'react-dropzone'
import { palette } from '../palette'
import { Highlight } from './Highlight'
import { isGoals } from '../goals'

const goalsFromFile = async file =>
  new Promise((resolve, reject) => {
    if (file.type !== 'application/json') {
      reject('File type (must be application/json)')
    }
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onabort = () => reject('aborted')
    reader.onerror = () => reject('unknown')
    reader.readAsBinaryString(file)
  }).then(content => {
    let data
    const invalidFormat = 'invalid file format'
    try {
      data = JSON.parse(content)
    } catch (err) {
      throw invalidFormat
    }

    if (!isGoals(data)) {
      throw invalidFormat
    }

    return data.goals
  })

export const ImportGoals = ({ onGoals }) => {
  const handleDrop = useCallback(async files => {
    if (!files || !files[0]) {
      return
    }
    try {
      onGoals(await goalsFromFile(files[0]))
    } catch (err) {
      alert('Error: ' + err)
    }
  }, [])
  return (
    <Dropzone onDrop={handleDrop}>
      {({ getRootProps, getInputProps, isDragActive }) => (
        <div
          {...getRootProps()}
          css={`
            position: relative;
            display: flex;
            align-items: center;
            cursor: pointer;
            &:after {
              content: '';
              display: ${isDragActive ? 'block' : 'none'};
              position: absolute;
              top: -4px;
              left: -4px;
              right: -6px;
              bottom: -6px;
              border-radius: 3px;
              border: 2px solid ${palette[1]};
            }
            &:focus {
              outline: 0;
            }
            &:focus-visible:after {
              display: block;
            }
          `}
        >
          <div
            css={`
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100px;
              height: 100px;
              margin-right: 20px;
              color: ${palette[2]};
              background: ${palette[1]};
              box-shadow: 2px 2px 0 ${palette[2]};
              &:active {
                transform: translate3d(1px, 1px, 0);
                box-shadow: 1px 1px 0 ${palette[2]};
              }
              &:before {
                content: '+';
                font-size: 40px;
              }
            `}
          >
            <input {...getInputProps()} />
          </div>
          <div>
            Import the <Highlight>goals.json</Highlight> file.
          </div>
        </div>
      )}
    </Dropzone>
  )
}
