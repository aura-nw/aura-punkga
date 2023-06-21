import React from 'react'
import Link from 'next/link'

const Books: React.FC = ({ data, onUpdate, styles, classes }: any) => {
  return (
    <div>
      <div style={styles.container} className={classes.container}>
        <button onClick={onUpdate}>Update: {data.a}</button>
        <Link href={`/books/${data.a}`} className='mt-4'>
          <button>Go to book detail page {data.a}</button>
        </Link>
      </div>
    </div>
  )
}
export default Books