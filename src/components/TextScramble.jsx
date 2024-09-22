import { useEffect, useRef } from 'react'
import './text-scramble.css'
import image1 from '../assets/1.png'
import image2 from '../assets/2.png'
import image3 from '../assets/3.png'

const TextScramble = () => {
  const textRefs = useRef([])

  useEffect(() => {
    const texts = [
      'It is about nurturing the flame of curiosity, seeking connections that ignite our souls.',
      'Embracing the transformative power of experiences is essential for growth.',
      'We find purpose in the journey, and meaning in every moment we share.',
    ]

    textRefs.current.forEach((textElement, index) => {
      if (!textElement) return
      const text = texts[index]

      function createSpans(text) {
        textElement.innerHTML = ''

        text.split(' ').forEach((word) => {
          const wordSpan = document.createElement('span')
          wordSpan.className = 'word'
          wordSpan.innerHTML = word
            .split('')
            .map(
              (char) =>
                `<span class="letter">${char === ' ' ? '&nbsp;' : char}</span>`
            )
            .join('')

          textElement.appendChild(wordSpan)
          textElement.appendChild(document.createTextNode(' '))
        })
      }
      createSpans(text)
      const letterSpans = textElement.querySelectorAll('.letter')

      letterSpans.forEach((span) => {
        const randomX = Math.floor(Math.random() * 300) - 150
        const randomY = Math.floor(Math.random() * 300) - 150
        span.style.transform = `translate(${randomX}%, ${randomY}%)`
        span.style.opacity = '0'
      })

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              letterSpans.forEach((span) => {
                span.style.opacity = '1'
                span.style.transform = 'translate(0%, 0%)'
              })
            }
          })
        },
        { threshold: 0.5 }
      )

      observer.observe(textElement)

      return () => {
        observer.disconnect()
      }
    })
  }, [])

  return (
    <div className='container'>
      <section className='wrapper'>
        <p ref={(el) => (textRefs.current[0] = el)}>texto1</p>
        <img src={image1} alt='' />
      </section>
      <section className='wrapper'>
        <img src={image2} alt='' />
        <p ref={(el) => (textRefs.current[1] = el)}>texto2</p>
      </section>
      <section className='wrapper'>
        <p ref={(el) => (textRefs.current[2] = el)}>texto3</p>
        <img src={image3} alt='' />
      </section>
    </div>
  )
}

export default TextScramble
