import React from 'react';
import clsx from 'clsx';

const rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2'];

function Photos({ photos }) {
  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {photos.map((image, imageIndex) => {
          const url = typeof image === "string" ? null : image.url
          const picUrl = typeof image === "string" ? image : image.picture
          const title = typeof image === "string" ? undefined : image.title
          const Element = url ? "a" : "div"
          return (
            <Element
              href={url}
              title={title}
              key={`${picUrl}-${imageIndex}`}
              className={clsx(
                'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl',
                rotations[imageIndex % rotations.length],
              )}>
              <img
                src={picUrl}
                alt=""
                sizes="(min-width: 640px) 18rem, 11rem"
                className="absolute inset-0 h-full w-full object-cover bg-center"
              />
            </Element>
          );
        })}
      </div>
    </div>
  );
}

export default Photos;
