import { useState, useEffect, useCallback } from 'react'
import { 
  Calculator as CalcIcon, 
  Delete, 
  Equal, 
  RotateCcw, 
  History, 
  Zap, 
  Activity,
  ChevronDown,
  ChevronUp,
  FlaskConical
} from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Utility for merging tailwind classes
function cn(...inputs) {
  return twMerge(clsx(inputs))
}

const Button = ({ onClick, children, className, variant = 'default', size = 'md' }) => {
  const variants = {
    default: 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/5',
    number: 'bg-white/10 hover:bg-white/20 text-white border-white/10 font-medium',
    operator: 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-500 border-amber-500/20',
    advanced: 'bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400 border-indigo-500/20',
    accent: 'bg-indigo-600 hover:bg-indigo-500 text-white border-transparent shadow-lg shadow-indigo-500/20',
    danger: 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-500 border-rose-500/20',
  }

  const sizes = {
    sm: 'h-10 text-xs',
    md: 'h-14 text-lg',
    lg: 'h-16 text-xl',
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full rounded-2xl border transition-all duration-200 active:scale-90 flex items-center justify-center backdrop-blur-sm',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </button>
  )
}

function App() {
  const [display, setDisplay] = useState('0')
  const [prevValue, setPrevValue] = useState(null)
  const [operator, setOperator] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)
  const [history, setHistory] = useState([])
  const [memory, setMemory] = useState(0)
  const [isScientific, setIsScientific] = useState(false)

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (/[0-9]/.test(e.key)) inputDigit(parseInt(e.key))
      if (e.key === '.') inputDot()
      if (e.key === 'Backspace') deleteLast()
      if (e.key === 'Escape') clear()
      if (e.key === 'Enter' || e.key === '=') handleEqual()
      if (['+', '-', '*', '/'].includes(e.key)) performOperation(e.key)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [display, prevValue, operator, waitingForOperand])

  const clear = () => {
    setDisplay('0')
    setPrevValue(null)
    setOperator(null)
    setWaitingForOperand(false)
  }

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit))
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit)
    }
  }

  const inputDot = () => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
    } else if (!display.includes('.')) {
      setDisplay(display + '.')
    }
  }

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(display)

    if (prevValue === null) {
      setPrevValue(inputValue)
    } else if (operator) {
      const currentValue = prevValue || 0
      const newValue = calculate(currentValue, inputValue, operator)
      setPrevValue(newValue)
      setDisplay(String(newValue))
    }

    setWaitingForOperand(true)
    setOperator(nextOperator)
  }

  const calculate = (prev, next, op) => {
    switch (op) {
      case '+': return prev + next
      case '-': return prev - next
      case '*': return prev * next
      case '/': return prev / next
      case '^': return Math.pow(prev, next)
      default: return next
    }
  }

  const handleEqual = () => {
    if (!operator || prevValue === null) return

    const inputValue = parseFloat(display)
    const newValue = calculate(prevValue, inputValue, operator)
    
    const calculationStr = `${prevValue} ${operator} ${inputValue} = ${newValue}`
    setHistory(prev => [calculationStr, ...prev].slice(0, 5))
    
    setDisplay(String(newValue))
    setPrevValue(null)
    setOperator(null)
    setWaitingForOperand(false)
  }

  const advancedFunc = (func) => {
    const val = parseFloat(display)
    let result
    switch(func) {
      case 'sqrt': result = Math.sqrt(val); break
      case 'sin': result = Math.sin(val * Math.PI / 180); break
      case 'cos': result = Math.cos(val * Math.PI / 180); break
      case 'log': result = Math.log10(val); break
      case 'pow2': result = Math.pow(val, 2); break
      case 'abs': result = Math.abs(val); break
      default: return
    }
    setDisplay(String(result))
    setHistory(prev => [`${func}(${val}) = ${result}`, ...prev].slice(0, 5))
  }

  const deleteLast = () => {
    if (display.length === 1) {
      setDisplay('0')
    } else {
      setDisplay(display.slice(0, -1))
    }
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex flex-col items-center justify-center p-4 sm:p-6 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] sm:w-[40%] h-[40%] bg-indigo-600/10 blur-[80px] sm:blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] sm:w-[40%] h-[40%] bg-pink-600/10 blur-[80px] sm:blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-[400px] relative flex flex-col gap-4 sm:gap-6">
        {/* Glass Card */}
        <div className="bg-slate-900/40 backdrop-blur-2xl p-4 sm:p-6 rounded-[24px] sm:rounded-[32px] border border-white/10 shadow-2xl overflow-hidden">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-4 sm:mb-8">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 bg-indigo-500/20 rounded-lg sm:rounded-xl">
                <CalcIcon className="text-indigo-400" size={16} />
              </div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Quantum Calc</span>
            </div>
            <button 
              onClick={() => setIsScientific(!isScientific)}
              className="p-1.5 sm:p-2 hover:bg-white/5 rounded-lg sm:rounded-xl transition-colors text-slate-400 hover:text-indigo-400"
            >
              <FlaskConical size={16} />
            </button>
          </div>

          {/* Display Area */}
          <div className="relative mb-4 sm:mb-8 px-1 sm:px-2">
            <div className="h-5 sm:h-6 text-right text-indigo-400/60 text-xs sm:text-sm font-medium mb-1 transition-all truncate">
              {prevValue !== null ? `${prevValue} ${operator || ''}` : history[0]?.split('=')[0]}
            </div>
            <div className="text-right overflow-hidden">
              <span className="text-4xl sm:text-6xl font-light tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] break-all">
                {display}
              </span>
            </div>
          </div>

          {/* Scientific Panel */}
          {isScientific && (
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2 mb-4 animate-in fade-in slide-in-from-top-4 duration-300">
              <Button onClick={() => advancedFunc('sin')} variant="advanced" size="sm" className="h-9 sm:h-10">sin</Button>
              <Button onClick={() => advancedFunc('cos')} variant="advanced" size="sm" className="h-9 sm:h-10">cos</Button>
              <Button onClick={() => advancedFunc('log')} variant="advanced" size="sm" className="h-9 sm:h-10">log</Button>
              <Button onClick={() => performOperation('^')} variant="advanced" size="sm" className="h-9 sm:h-10">xʸ</Button>
              <Button onClick={() => advancedFunc('sqrt')} variant="advanced" size="sm" className="h-9 sm:h-10">√x</Button>
              <Button onClick={() => advancedFunc('pow2')} variant="advanced" size="sm" className="h-9 sm:h-10">x²</Button>
              <Button onClick={() => advancedFunc('abs')} variant="advanced" size="sm" className="h-9 sm:h-10">|x|</Button>
              <Button onClick={() => setDisplay(String(Math.PI))} variant="advanced" size="sm" className="h-9 sm:h-10">π</Button>
            </div>
          )}

          {/* Main Grid */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {/* Row 1 */}
            <Button onClick={clear} variant="danger" className="col-span-2 text-sm sm:text-base">
              <RotateCcw size={16} className="mr-1 sm:mr-2 opacity-70" /> CLEAR
            </Button>
            <Button onClick={deleteLast} variant="default">
              <Delete size={18} className="opacity-70" />
            </Button>
            <Button onClick={() => performOperation('/')} variant="operator">
              <span className="text-xl sm:text-2xl">÷</span>
            </Button>

            {/* Row 2 */}
            <Button onClick={() => inputDigit(7)} variant="number">7</Button>
            <Button onClick={() => inputDigit(8)} variant="number">8</Button>
            <Button onClick={() => inputDigit(9)} variant="number">9</Button>
            <Button onClick={() => performOperation('*')} variant="operator">
              <span className="text-xl sm:text-2xl">×</span>
            </Button>

            {/* Row 3 */}
            <Button onClick={() => inputDigit(4)} variant="number">4</Button>
            <Button onClick={() => inputDigit(5)} variant="number">5</Button>
            <Button onClick={() => inputDigit(6)} variant="number">6</Button>
            <Button onClick={() => performOperation('-')} variant="operator">
              <span className="text-2xl sm:text-3xl">−</span>
            </Button>

            {/* Row 4 */}
            <Button onClick={() => inputDigit(1)} variant="number">1</Button>
            <Button onClick={() => inputDigit(2)} variant="number">2</Button>
            <Button onClick={() => inputDigit(3)} variant="number">3</Button>
            <Button onClick={() => performOperation('+')} variant="operator">
              <span className="text-xl sm:text-2xl">+</span>
            </Button>

            {/* Row 5 */}
            <Button onClick={() => inputDigit(0)} variant="number" className="col-span-2 text-left px-6 sm:px-8">0</Button>
            <Button onClick={inputDot} variant="number">.</Button>
            <Button onClick={handleEqual} variant="accent">
              <Equal size={20} />
            </Button>
          </div>
        </div>

        {/* History Widget */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-white/5 p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-2 sm:mb-3 text-slate-400">
            <History size={12} />
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">Recent Activity</span>
          </div>
          <div className="space-y-1.5 sm:space-y-2">
            {history.length > 0 ? history.map((item, i) => (
              <div key={i} className="text-[11px] sm:text-xs text-slate-500 flex justify-between border-b border-white/5 pb-1 last:border-0">
                <span className="truncate mr-2">{item.split('=')[0]}</span>
                <span className="text-indigo-400 font-medium whitespace-nowrap">= {item.split('=')[1]}</span>
              </div>
            )) : (
              <div className="text-[9px] sm:text-[10px] text-slate-600 italic text-center py-1">No calculations yet...</div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mt-12 flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-slate-600 text-[9px] sm:text-[10px] font-medium tracking-[0.2em] uppercase text-center">
        <div className="flex items-center gap-2">
          <Zap size={10} className="text-amber-500" /> ULTRA RESPONSIVE
        </div>
        <div className="flex items-center gap-2">
          <Activity size={10} className="text-indigo-500" /> QUANTUM ENGINE
        </div>
      </div>
    </div>
  )
}

export default App
