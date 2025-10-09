import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthProvider'
import { MdAddLink } from 'react-icons/md'
import axios from '../config/axios'
import { toast } from 'react-hot-toast'

const Home = () => {
  const [authuser] = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [projectName, setProjectName] = useState('')
  const [loading, setLoading] = useState(false)

  // close modal on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setIsModalOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const openModal = () => {
    setProjectName('')
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!projectName.trim()) {
      toast.error('Please enter a project name')
      return
    }
    setLoading(true)
    try {
      // include token if present in localStorage 'app'
      
     
      
      const res = await axios.post('/project/create', { name: projectName })
      console.log(res?.data?.newproject)
      toast.success(res?.data?.newproject ? 'Project created' : 'Created')
      closeModal()
    } catch (err) {
      const message = err?.response?.data?.msg || err?.response?.data?.message || err.message || 'Create project failed'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="min-h-screen w-screen bg-gray-900 text-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold">Projects</h1>
            <button
              onClick={openModal}
              className="inline-flex items-center gap-3 py-2 px-4 bg-indigo-600 hover:bg-indigo-500 rounded-md text-white shadow"
            >
              <MdAddLink className="text-2xl" />
              Add project
            </button>
          </div>

          <div className="rounded-md border border-gray-700 p-6 bg-gray-800/40">
            <p className="text-gray-300">Welcome{authuser?.user ? `, ${authuser.user.name}` : ''} — create a project to get started.</p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          aria-modal="true"
          role="dialog"
        >
          {/* overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          />

          <div className="relative z-10 w-full max-w-md mx-4">
            <div className="bg-gray-900 rounded-xl border border-gray-700 shadow-lg p-6">
              <h2 className="text-lg font-medium text-gray-100 mb-3">Create new project</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm text-gray-300 block mb-1">Project name</label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 text-gray-100 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="My Awesome Project"
                    autoFocus
                  />
                </div>

                <div className="flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-700 text-gray-200 rounded-md hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 disabled:opacity-60"
                  >
                    {loading ? 'Creating...' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Home
