import { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'
import { TextRenderer } from '../TextRenderer/TextRenderer'
import { Sidebar } from '../Sidebar/Sidebar'

export const Main = () => {

  const {onSent,recentPrompt,showResult,loading,resultData,setInput,input,error,isProcessing} = useContext(Context)

  return (
    <div className='app-container'>
      <Sidebar />
      
      <div className="main main-with-sidebar">
        <div className={`main-container ${!showResult ? 'welcome-state' : 'chat-state'}`}>

          {!showResult
          ?<>
          
          <div className="greet">
              <p><span>Hello, Geetansh.</span></p>
              <p>How can I help you today?</p>
          </div>
          <div className="cards">
              <div className="card" onClick={() => onSent("Suggest beautiful places to see on an upcoming road trip")}>
                  <p>Suggest beautiful places to see on an upcoming road trip</p>
                  <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card" onClick={() => onSent("Briefly summarize this concept: urban planning")}>
                  <p>Briefly summarize this concept: urban planning</p>
                  <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card" onClick={() => onSent("Brainstorm team bonding activities for our work retreat")}>
                  <p>Brainstorm team bonding activities for our work retreat</p>
                  <img src={assets.message_icon} alt="" />
              </div>
              <div className="card" onClick={() => onSent("Improve the readability of the following code")}>
                  <p>Improve the readability of the following code</p>
                  <img src={assets.code_icon} alt="" />
              </div>
          </div>
          </>
          :<div className='result'>
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="Gemini" />
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
                  {!loading && resultData && (
                    <div className="response-end-indicator">
                      <div className="response-separator"></div>
                      <p className="response-complete-text">Response complete</p>
                    </div>
                  )}
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
                      <img src={assets.gallery_icon} alt="" />
                      <img src={assets.mic_icon} alt="" />
                     {input && !isProcessing?<img onClick={()=>onSent()} src={assets.send_icon} alt="" />:null} 
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