import { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'
import { TextRenderer } from '../TextRenderer/TextRenderer'

export const Main = () => {

  const {onSent,recentPrompt,showResult,loading,resultData,setInput,input,error,isProcessing} = useContext(Context)

  return (
    <div className='app-container'>
      
      <div className="main main-with-sidebar">
        <div className={`main-container ${!showResult ? 'welcome-state' : 'chat-state'}`}>

          {!showResult
          ?<>
          
          <div className="greet">
              <p><span>Hello, User.</span></p>
              <p>How can I help you today?</p>
          </div>
          <div className="cards">
              <div 
                className="card" 
                onClick={() => onSent("Suggest beautiful places to see on an upcoming road trip")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSent("Suggest beautiful places to see on an upcoming road trip");
                  }
                }}
                aria-label="Suggest beautiful places to see on an upcoming road trip"
              >
                  <p>Suggest beautiful places to see on an upcoming road trip</p>
                  <img src={assets.compass_icon} alt="Compass icon" />
              </div>
              <div 
                className="card" 
                onClick={() => onSent("Briefly summarize this concept: urban planning")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSent("Briefly summarize this concept: urban planning");
                  }
                }}
                aria-label="Briefly summarize this concept: urban planning"
              >
                  <p>Briefly summarize this concept: urban planning</p>
                  <img src={assets.bulb_icon} alt="Light bulb icon" />
              </div>
              <div 
                className="card" 
                onClick={() => onSent("Brainstorm team bonding activities for our work retreat")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSent("Brainstorm team bonding activities for our work retreat");
                  }
                }}
                aria-label="Brainstorm team bonding activities for our work retreat"
              >
                  <p>Brainstorm team bonding activities for our work retreat</p>
                  <img src={assets.message_icon} alt="Message icon" />
              </div>
              <div 
                className="card" 
                onClick={() => onSent("Improve the readability of the following code")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSent("Improve the readability of the following code");
                  }
                }}
                aria-label="Improve the readability of the following code"
              >
                  <p>Improve the readability of the following code</p>
                  <img src={assets.code_icon} alt="Code icon" />
              </div>
          </div>
          </>
          :<div className='result'>
            <div className="result-title">
              <img src={assets.user_icon} alt="User avatar" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="Gemini AI assistant" />
              <div className="response-content">
                {loading
                ?<div className='loader'>
                  <hr />
                  <hr />
                  <hr />
                  </div>
                : error
                ?<div className='error-message'>
                  <p>❌ {error}</p>
                  <button onClick={() => onSent(recentPrompt)} className='retry-button'>
                    Try Again
                  </button>
                </div>
                :<>
                  <TextRenderer content={resultData} />
                </>
              }
              </div>
            </div>
            </div>
        }


          <div className="main-bottom">
              <div className="search-box">
                  <input 
                      onChange={(e)=>{setInput(e.target.value)}} 
                      value={input} 
                      type="text" 
                      placeholder='Enter a prompt here'
                      onKeyDown={(e) => {
                          if (e.key === 'Enter' && input.trim() && !isProcessing) {
                              e.preventDefault(); // Prevent form submission
                              onSent();
                          }
                      }}
                      disabled={isProcessing}
                      aria-label="Enter your message"
                  />
                  <div>
                      <img src={assets.gallery_icon} alt="Upload image" title="Upload image" />
                      <img src={assets.mic_icon} alt="Voice input" title="Voice input" />
                     {input && !isProcessing?<img onClick={()=>onSent()} src={assets.send_icon} alt="Send message" title="Send message" />:null} 
                  </div>
              </div>
              <p className="bottom-info">
              Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
              </p>
          </div>
        </div>
      </div>
    </div>
  )
}