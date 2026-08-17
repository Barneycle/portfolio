import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import BuildLog from '../components/BuildLog'

const initialTasks = [
  { id: 'task-1', title: 'Set up Vite + React + Tailwind', status: 'done', startDate: '2026-08-01', endDate: '2026-08-02' },
  { id: 'task-2', title: 'Build Navbar and Footer', status: 'done', startDate: '2026-08-03', endDate: '2026-08-05' },
  { id: 'task-3', title: 'Write Home, About, Skills content', status: 'done', startDate: '2026-08-06', endDate: '2026-08-10' },
  { id: 'task-4', title: 'Build Kanban board', status: 'done', startDate: '2026-08-11', endDate: '2026-08-13' },
  { id: 'task-5', title: 'Build Gantt chart', status: 'done', startDate: '2026-08-14', endDate: '2026-08-16' },
  { id: 'task-6', title: 'Deploy to Vercel', status: 'done', startDate: '2026-08-17', endDate: '2026-08-19' },
]

const columns = [
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
]

const tabs = [
  { id: 'kanban', label: 'Kanban' },
  { id: 'gantt', label: 'Gantt' },
  { id: 'logs', label: 'Build log' },
]

function addDaysDefault(index) {
  const base = new Date('2026-08-17')
  base.setDate(base.getDate() + index * 2)
  const start = base.toISOString().slice(0, 10)
  const end = new Date(base)
  end.setDate(end.getDate() + 1)
  return { startDate: start, endDate: end.toISOString().slice(0, 10) }
}

function migrateTasks(tasks) {
  return tasks.map((task, i) => {
    if (task.startDate && task.endDate) return task
    return { ...task, ...addDaysDefault(i) }
  })
}

function KanbanBoard({ tasks, setTasks }) {
  const [newTaskTitle, setNewTaskTitle] = useState('')

  function handleDragEnd(result) {
    const { source, destination, draggableId } = result
    if (!destination) return
    if (source.droppableId === destination.droppableId && source.index === destination.index) return

    setTasks((prev) =>
      prev.map((task) =>
        task.id === draggableId ? { ...task, status: destination.droppableId } : task
      )
    )
  }

  function addTask() {
    if (!newTaskTitle.trim()) return
    const defaults = addDaysDefault(tasks.length)
    const newTask = { id: `task-${Date.now()}`, title: newTaskTitle.trim(), status: 'todo', ...defaults }
    setTasks((prev) => [...prev, newTask])
    setNewTaskTitle('')
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div className="min-w-0">
      <div className="mb-6 flex w-full max-w-md flex-col gap-2 sm:mb-8 sm:flex-row">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
          placeholder="Add a new task..."
          className="min-h-11 min-w-0 flex-1 rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-lime-400 focus:outline-none"
        />
        <button onClick={addTask} className="min-h-11 rounded-md bg-lime-400 px-4 py-2 text-sm font-medium text-zinc-950 hover:bg-lime-300 sm:shrink-0">
          Add
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {columns.map((col) => (
            <Droppable droppableId={col.id} key={col.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`min-h-[180px] rounded-xl border p-3 sm:min-h-[240px] sm:p-4 md:min-h-[300px] ${
                    snapshot.isDraggingOver
                      ? 'border-lime-400/40 bg-lime-400/5'
                      : 'border-zinc-800 bg-zinc-900'
                  }`}
                >
                  <h3 className="mb-3 font-mono text-xs tracking-wide text-zinc-500 uppercase">{col.title}</h3>
                  <div className="flex flex-col gap-2">
                    {tasks.filter((t) => t.status === col.id).map((task, index) => (
                      <Draggable draggableId={task.id} index={index} key={task.id}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`flex items-start justify-between gap-2 rounded-md border border-zinc-800 bg-zinc-950 p-3 text-sm ${
                              snapshot.isDragging ? 'border-lime-400/50' : ''
                            }`}
                          >
                            <span className="min-w-0 break-words">{task.title}</span>
                            <button onClick={() => deleteTask(task.id)} className="min-h-6 min-w-6 shrink-0 text-xs text-zinc-600 hover:text-red-400">
                              ✕
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}

function parseDate(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, day)
}

function toISODate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function localToday() {
  return toISODate(new Date())
}

function dayDiff(a, b) {
  return Math.round((parseDate(b) - parseDate(a)) / (1000 * 60 * 60 * 24))
}

function addDays(dateStr, amount) {
  const date = parseDate(dateStr)
  date.setDate(date.getDate() + amount)
  return toISODate(date)
}

function formatTick(dateStr, mode) {
  const date = parseDate(dateStr)
  if (mode === 'day') return String(date.getDate())
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function buildTicks(minDate, totalDays) {
  if (totalDays <= 16) {
    return {
      mode: 'day',
      ticks: Array.from({ length: totalDays }, (_, i) => addDays(minDate, i)),
    }
  }

  if (totalDays <= 90) {
    const ticks = []
    for (let i = 0; i < totalDays; i += 7) ticks.push(addDays(minDate, i))
    return { mode: 'week', ticks }
  }

  const ticks = [minDate]
  const start = parseDate(minDate)
  let cursor = new Date(start.getFullYear(), start.getMonth() + 1, 1)
  while (dayDiff(minDate, toISODate(cursor)) < totalDays) {
    ticks.push(toISODate(cursor))
    cursor = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1)
  }
  return { mode: 'month', ticks }
}

const barColors = {
  done: '#34d399',
  'in-progress': '#a3e635',
  todo: '#3f3f46',
}

function pct(minDate, date, totalDays) {
  return (dayDiff(minDate, date) / totalDays) * 100
}

function durationDays(task) {
  return Math.max(dayDiff(task.startDate, task.endDate) + 1, 1)
}

function GanttLegend() {
  return (
    <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-xs text-zinc-500">
      <span className="flex items-center gap-1">
        <span className="inline-block h-3 w-3 rounded-sm bg-zinc-700" /> To Do
      </span>
      <span className="flex items-center gap-1">
        <span className="inline-block h-3 w-3 rounded-sm bg-lime-400" /> In Progress
      </span>
      <span className="flex items-center gap-1">
        <span className="inline-block h-3 w-3 rounded-sm bg-emerald-400" /> Done
      </span>
      <span className="flex items-center gap-1">
        <span className="inline-block h-3 w-px bg-lime-400" /> Today
      </span>
    </div>
  )
}

function DateFields({ task, onChange }) {
  return (
    <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 lg:flex lg:w-auto">
      <label className="flex min-w-0 flex-col gap-1">
        <span className="font-mono text-[10px] tracking-wider text-zinc-500 uppercase">Start</span>
        <input
          type="date"
          value={task.startDate}
          onChange={(e) => onChange(task.id, 'startDate', e.target.value)}
          className="h-11 w-full min-w-0 rounded border border-zinc-700 bg-zinc-950 px-2 text-sm text-zinc-300 lg:w-36"
        />
      </label>
      <label className="flex min-w-0 flex-col gap-1">
        <span className="font-mono text-[10px] tracking-wider text-zinc-500 uppercase">End</span>
        <input
          type="date"
          value={task.endDate}
          onChange={(e) => onChange(task.id, 'endDate', e.target.value)}
          className="h-11 w-full min-w-0 rounded border border-zinc-700 bg-zinc-950 px-2 text-sm text-zinc-300 lg:w-36"
        />
      </label>
    </div>
  )
}

function TimelineTrack({ minDate, totalDays, ticks, today, todayInRange, children }) {
  return (
    <div className="relative h-full w-full min-w-0 overflow-hidden rounded-md border border-zinc-800 bg-zinc-950">
      {ticks.map((tick) => (
        <div
          key={tick}
          className="absolute inset-y-0 w-px bg-zinc-800"
          style={{ left: `${pct(minDate, tick, totalDays)}%` }}
        />
      ))}
      {todayInRange && (
        <div
          className="absolute inset-y-0 z-10 w-px bg-lime-400"
          style={{ left: `${pct(minDate, today, totalDays)}%` }}
          title="Today"
        />
      )}
      {children}
    </div>
  )
}

function GanttBar({ task, minDate, totalDays, selected, onSelect, top }) {
  const offset = pct(minDate, task.startDate, totalDays)
  const width = (durationDays(task) / totalDays) * 100
  const duration = durationDays(task)

  return (
    <button
      type="button"
      onClick={() => onSelect(task.id)}
      className={`absolute z-20 h-6 overflow-hidden rounded-md text-left font-mono text-[10px] leading-6 transition ${
        task.status === 'todo' ? 'text-zinc-300' : 'text-zinc-950'
      } ${selected ? 'ring-2 ring-lime-400' : ''}`}
      style={{
        top,
        left: `${offset}%`,
        width: `${Math.max(width, 2.5)}%`,
        backgroundColor: barColors[task.status],
      }}
      aria-label={`${task.title}, ${duration} day${duration === 1 ? '' : 's'}`}
    >
      {width >= 9 && <span className="px-1.5">{duration}d</span>}
    </button>
  )
}

function GanttChart({ tasks, setTasks }) {
  const [editingId, setEditingId] = useState(null)

  if (tasks.length === 0) {
    return <p className="text-center text-sm text-zinc-500">No tasks yet. Add some in the Kanban tab.</p>
  }

  const minDate = tasks.reduce((min, t) => (t.startDate < min ? t.startDate : min), tasks[0].startDate)
  const maxDate = tasks.reduce((max, t) => (t.endDate > max ? t.endDate : max), tasks[0].endDate)
  const totalDays = Math.max(dayDiff(minDate, maxDate) + 1, 1)
  const { ticks, mode } = buildTicks(minDate, totalDays)
  const today = localToday()
  const todayInRange = today >= minDate && today <= maxDate
  const editing = tasks.find((t) => t.id === editingId)

  function updateDate(id, field, value) {
    if (!value) return
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== id) return task
        const next = { ...task, [field]: value }
        if (next.endDate < next.startDate) {
          if (field === 'startDate') next.endDate = value
          else next.startDate = value
        }
        return next
      })
    )
  }

  function toggleEdit(id) {
    setEditingId((current) => (current === id ? null : id))
  }

  return (
    <div className="min-w-0">
      <p className="mb-4 hidden text-center font-mono text-xs text-zinc-500 lg:block">Click a bar to edit dates</p>

      <div className="flex flex-col gap-4 lg:hidden">
        {tasks.map((task) => {
          const duration = durationDays(task)
          return (
            <div key={task.id} className="flex min-w-0 flex-col gap-3 rounded-lg border border-zinc-800 bg-zinc-900 p-3">
              <div className="flex items-start justify-between gap-3">
                <span className="min-w-0 text-sm break-words text-zinc-300">{task.title}</span>
                <span className="shrink-0 font-mono text-xs text-zinc-500">{duration}d</span>
              </div>
              <div className="h-8">
                <TimelineTrack minDate={minDate} totalDays={totalDays} ticks={ticks} today={today} todayInRange={todayInRange}>
                  <GanttBar task={task} minDate={minDate} totalDays={totalDays} selected={editingId === task.id} onSelect={toggleEdit} top={4} />
                </TimelineTrack>
              </div>
              <DateFields task={task} onChange={updateDate} />
            </div>
          )
        })}
      </div>

      <div className="hidden lg:block">
        <div className="overflow-x-auto">
          <div className="min-w-[42rem]">
            <div className="mb-1 flex">
              <div className="w-52 shrink-0 pr-4" />
              <div className="relative h-7 min-w-0 flex-1">
                {ticks.map((tick) => (
                  <span
                    key={tick}
                    className="absolute font-mono text-[10px] text-zinc-500"
                    style={{ left: `${pct(minDate, tick, totalDays)}%`, transform: 'translateX(-50%)' }}
                  >
                    {formatTick(tick, mode)}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex rounded-xl border border-zinc-800 bg-zinc-900">
              <div className="w-52 shrink-0 divide-y divide-zinc-800 border-r border-zinc-800">
                {tasks.map((task) => (
                  <button
                    key={task.id}
                    type="button"
                    onClick={() => toggleEdit(task.id)}
                    className={`flex h-11 w-full items-center truncate px-3 text-left text-sm transition ${
                      editingId === task.id ? 'bg-lime-400/10 text-lime-400' : 'text-zinc-300 hover:bg-zinc-800'
                    }`}
                  >
                    {task.title}
                  </button>
                ))}
              </div>

              <div className="min-w-0 flex-1" style={{ height: tasks.length * 44 }}>
                <TimelineTrack minDate={minDate} totalDays={totalDays} ticks={ticks} today={today} todayInRange={todayInRange}>
                  {tasks.map((task, index) => (
                    <GanttBar
                      key={task.id}
                      task={task}
                      minDate={minDate}
                      totalDays={totalDays}
                      selected={editingId === task.id}
                      onSelect={toggleEdit}
                      top={index * 44 + 10}
                    />
                  ))}
                </TimelineTrack>
              </div>
            </div>
          </div>
        </div>

        {editing && (
          <div className="mt-4 flex flex-wrap items-end gap-4 rounded-xl border border-lime-400/30 bg-zinc-900 p-4">
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[10px] tracking-wider text-zinc-500 uppercase">Editing</p>
              <p className="truncate text-sm text-zinc-100">{editing.title}</p>
            </div>
            <DateFields task={editing} onChange={updateDate} />
            <p className="pb-3 font-mono text-xs text-zinc-500">{durationDays(editing)} days</p>
            <button
              type="button"
              onClick={() => setEditingId(null)}
              className="h-11 rounded-md border border-zinc-700 px-3 text-sm text-zinc-400 hover:text-zinc-100"
            >
              Done
            </button>
          </div>
        )}
      </div>

      <GanttLegend />
    </div>
  )
}

function PmTools() {
  const [searchParams, setSearchParams] = useSearchParams()
  const tabParam = searchParams.get('tab')
  const activeTab = tabs.some((tab) => tab.id === tabParam) ? tabParam : 'kanban'
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem('kanban-tasks')
    const loaded = saved ? JSON.parse(saved) : initialTasks
    setTasks(migrateTasks(loaded))
  }, [])

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('kanban-tasks', JSON.stringify(tasks))
    }
  }, [tasks])

  function setTab(id) {
    if (id === 'kanban') setSearchParams({})
    else setSearchParams({ tab: id })
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 2xl:max-w-6xl 2xl:py-32 4xl:max-w-7xl">
      <p className="mb-3 text-center font-mono text-xs tracking-widest text-lime-400 uppercase">Product</p>
      <h1 className="font-display mb-2 text-center text-[clamp(1.75rem,4vw,3.5rem)] font-bold tracking-tight">Tools</h1>
      <p className="mb-8 px-2 text-center text-sm text-zinc-500 sm:mb-10 sm:text-base">Working project management tools, built into this site.</p>

      <div className="mb-8 flex w-full flex-wrap justify-center gap-2 sm:mb-10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setTab(tab.id)}
            className={`min-h-11 min-w-0 flex-1 rounded-md px-3 py-2 text-sm font-medium transition sm:flex-none sm:px-4 ${
              activeTab === tab.id
                ? 'bg-lime-400 text-zinc-950'
                : 'bg-zinc-900 text-zinc-400 hover:text-zinc-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'kanban' && <KanbanBoard tasks={tasks} setTasks={setTasks} />}
      {activeTab === 'gantt' && <GanttChart tasks={tasks} setTasks={setTasks} />}
      {activeTab === 'logs' && (
        <div className="mx-auto max-w-3xl">
          <p className="mb-8 text-center text-sm text-zinc-500 sm:mb-10">How this site itself was planned, built, and tracked.</p>
          <BuildLog />
        </div>
      )}
    </section>
  )
}

export default PmTools
