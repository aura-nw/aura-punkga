import React from 'react';
import Link from 'next/link';

export const Items: React.FC = ({ data, onUpdate, styles, classes }: any) => {
  return (
    <div>
      <div style={styles.container} className={classes.container}>
        <button onClick={onUpdate}>Update: {data.a}</button>
        <Link href={`/items/${data.a}`} className='mt-4'>
          <button>Go to item detail page {data.a}</button>
        </Link>
      </div>
    </div>
  );
};
