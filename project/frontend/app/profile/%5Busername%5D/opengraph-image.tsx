import { ImageResponse } from 'next/og'
import db from '@/lib/db'

export const runtime = 'edge'
export const alt = 'Axion Intelligence Neural Identity'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: { username: string } }) {
  const user = await db.user.findFirst({
    where: { 
      OR: [
        { name: { contains: params.username } },
        { referralCode: params.username }
      ]
    },
    select: {
      name: true,
      level: true,
      xp: true,
      streak: true,
    }
  })

  if (!user) {
    return new ImageResponse(
      (
        <div style={{ background: 'black', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h1 style={{ color: 'white', fontSize: 60 }}>Axion Intelligence</h1>
        </div>
      )
    )
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000',
          backgroundImage: 'radial-gradient(circle at 50% 50%, #00baff22, #000)',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Border Glow */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '10px', background: 'linear-gradient(to right, #00baff, #9d50bb, #00baff)' }} />
        
        {/* Logo Section */}
        <div style={{ position: 'absolute', top: '50px', left: '60px', display: 'flex', alignItems: 'center' }}>
           <div style={{ width: '40px', height: '40px', background: '#00baff', borderRadius: '10px', marginRight: '15px' }} />
           <div style={{ color: '#00baff', fontSize: '32px', fontWeight: '900', letterSpacing: '-1px' }}>AXION<span style={{ color: '#fff' }}>.AI</span></div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '60px' }}>
            {/* User Level Circle */}
            <div style={{ 
                width: '300px', 
                height: '300px', 
                borderRadius: '150px', 
                background: 'linear-gradient(to bottom right, #00baff, #9d50bb)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '6px'
            }}>
                <div style={{ 
                    width: '100%', 
                    height: '100%', 
                    borderRadius: '50%', 
                    background: '#000',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <div style={{ fontSize: '100px', fontWeight: '900', color: '#fff', fontStyle: 'italic', lineHeight: 1 }}>{user.level}</div>
                    <div style={{ fontSize: '20px', fontWeight: '900', color: '#00baff', letterSpacing: '4px', marginTop: '10px' }}>LEVEL</div>
                </div>
            </div>

            {/* User Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ color: '#fff', fontSize: '72px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '-2px' }}>{user.name}</div>
                
                <div style={{ display: 'flex', gap: '30px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ color: '#00baff', fontSize: '36px', fontWeight: '900', fontStyle: 'italic' }}>{user.xp.toLocaleString()}</div>
                        <div style={{ color: '#666', fontSize: '14px', fontWeight: '900', letterSpacing: '2px' }}>NEURAL XP</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ color: '#ff7000', fontSize: '36px', fontWeight: '900', fontStyle: 'italic' }}>{user.streak}🔥</div>
                        <div style={{ color: '#666', fontSize: '14px', fontWeight: '900', letterSpacing: '2px' }}>STREAK</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ color: '#00baff', fontSize: '14px', fontWeight: '900', background: 'rgba(0,186,255,0.1)', padding: '6px 15px', borderRadius: '20px', border: '1px solid rgba(0,186,255,0.2)' }}>RANK {user.level > 10 ? 'S' : 'A'}</div>
                    </div>
                </div>
            </div>
        </div>

        {/* Footer */}
        <div style={{ position: 'absolute', bottom: '50px', right: '60px', color: '#333', fontSize: '16px', fontWeight: '900', letterSpacing: '3px' }}>
            VERIFIED NEURAL IDENTITY // NODE-01
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
