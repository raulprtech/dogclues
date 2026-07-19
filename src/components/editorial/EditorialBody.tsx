'use client';

import { PortableText } from '@portabletext/react';

export default function EditorialBody({ value }: { value: string | unknown[] }) {
  if (typeof value === 'string') {
    return <div className="prose prose-lg max-w-none text-deep-blue/80" dangerouslySetInnerHTML={{ __html: value }} />;
  }

  return (
    <div className="prose prose-lg max-w-none text-deep-blue/80">
      <PortableText
        value={value as Parameters<typeof PortableText>[0]['value']}
        components={{
          types: {
            image: ({ value: image }) => (
              <figure>
                <img src={image.url} alt={image.alt || ''} />
                {image.credit && <figcaption>{image.credit}</figcaption>}
              </figure>
            ),
          },
        }}
      />
    </div>
  );
}
