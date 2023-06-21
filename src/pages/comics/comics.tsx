import React from 'react'
import Link from 'next/link'

const Comics: React.FC = ({ data, onUpdate, styles, classes }: any) => {
  return (
    <div>
      <div style={styles.container} className={classes.container}>
        <button onClick={onUpdate}>Update: {data.a}</button>
        <Link href={`/comics/${data.a}`} className='mt-4'>
          <button>Go to comics detail page {data.a}</button>
        </Link>
      </div>
    </div>
  )
}
export default Comics