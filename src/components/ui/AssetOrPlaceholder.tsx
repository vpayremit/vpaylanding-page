import { existsSync } from 'node:fs'
import { join } from 'node:path'

import Image from 'next/image'

export function hasPublicAsset(folder: 'icons' | 'images', filename: string) {
  return existsSync(join(process.cwd(), 'public', folder, filename))
}

function AssetPlaceholder({
  filename,
  className,
  dark = false,
}: {
  filename: string
  className: string
  dark?: boolean
}) {
  return (
    <div
      className={className}
      style={{
        background: dark
          ? 'linear-gradient(135deg, rgba(255,122,33,0.28), rgba(255,213,62,0.12))'
          : 'radial-gradient(circle at top right, rgba(255,213,0,0.18), transparent 38%), linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.04))',
      }}
    >
      <span
        className={
          dark
            ? 'max-w-full break-all px-3 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-white/70'
            : 'max-w-full break-all px-3 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-[#666563]'
        }
      >
        {filename}
      </span>
    </div>
  )
}

export default function AssetOrPlaceholder({
  folder,
  filename,
  alt,
  width,
  height,
  className,
  sizes,
  dark,
}: {
  folder: 'icons' | 'images'
  filename: string
  alt: string
  width: number
  height: number
  className: string
  sizes: string
  dark?: boolean
}) {
  if (!hasPublicAsset(folder, filename)) {
    return <AssetPlaceholder filename={filename} className={className} dark={dark} />
  }

  return (
    <Image
      src={`/${folder}/${filename}`}
      alt={alt}
      width={width}
      height={height}
      className={className}
      sizes={sizes}
      unoptimized={filename.endsWith('.svg')}
    />
  )
}
