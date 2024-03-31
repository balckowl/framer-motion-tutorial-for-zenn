import { useState } from 'react'
import { AnimatePresence, Reorder, motion } from 'framer-motion'
import './App.css'

function App() {

  type LogoListType = {
    id: string;
    url: string;
    img: string;
  };

  const [count, setCount] = useState(0)
  const [logoList, setLogoList] = useState<LogoListType[]>([{ id: 'vite', url: 'https://vitejs.dev', img: '/vite.svg' }, { id: 'react', url: 'https://react.dev', img: '/react.svg' }])
  const [isShow, setIsShow] = useState<boolean>(false)


  const handleClick = () => {
    setCount((count) => count + 1)
    setIsShow(true)
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.5, 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };  

  return (
    <>
      <div className='h-screen flex justify-center items-center flex-col'>
        <div className='mb-[38px]'>
          <Reorder.Group axis="x" values={logoList} onReorder={setLogoList} className='flex gap-[30px]'>
            {logoList.map((logo) => (
              <Reorder.Item key={logo.id} value={logo}>
                <a href={logo.url} target="_blank" draggable="false">
                  <motion.img
                    src={logo.img}
                    alt={`${logo.id} logo`}
                    draggable="false"
                    className="w-[80px] h-[80px]"
                    animate={logo.id == 'react' ? { rotate: [0, 180, 360], scale: [1, 1.5, 1] } : {}}
                    transition={logo.id == 'react' ? { duration: 2, repeat: Infinity, ease: 'linear', times: [0, 0.75, 1] } : {}}
                  />
                </a>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
        <h1 className='text-[50px] mb-[30px] font-bold flex gap-2'>Vite + React</h1>
        <div className="card text-center mb-[5px]">
          <div className='relative w-max mx-auto'>
            <motion.button whileTap={{ scale: 1.2 }} onClick={handleClick} className='border border-black py-1 px-3 rounded mb-[30px]'>
              count is {count}
            </motion.button>
            <AnimatePresence>
              {isShow && <motion.p key={count}
                onAnimationComplete={() => setIsShow(false)}
                animate={{ opacity: [0, 1] }}
                exit={{ opacity: 0, color: 'blue' }}
                transition={{ duration: 0.5 }}
                className='absolute top-[-10px] right-[-30px] text-[20px] text-red-500'
              >+1</motion.p>}
            </AnimatePresence>
          </div>
          <p className='text-[14px]'>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="text-[14px]">
          Click on the Vite and React logos to learn more
        </p>
      </div>
      <div className='container mx-auto border-t border-black'>
        <section className='py-[100px] border-black flex items-center gap-[50px] flex-col'>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <img src="/install-command.png" alt="" className='w-[700px]' />
          </motion.div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <img src="/project-name.png" alt="" className='w-[700px]' />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <img src="/choose-fw.png" alt="" className='w-[700px]' />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <img src="/choose-lang.png" alt="" className='w-[700px]' />
          </motion.div>
        </section>
      </div>
    </>
  )
}

export default App
