import { useState } from 'react'
import { premierepro } from './utils/premierepro';
import uxp from 'uxp';

interface ProjectInfo {
  name: string
  path: string
  duration: number
}

function App() {
  const [projectInfo, setProjectInfo] = useState<ProjectInfo | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleGetProjectInfo = async () => {
    setIsLoading(true)
    const pproject = await premierepro.Project.getActiveProject()
    try {
      if (uxp.host) {
        const project = {
          name: uxp.host.name || 'Unknown Project',
          path: pproject.path,
          duration: 0
        }

        setProjectInfo(project)
        setMessage(`호스트 애플리케이션: ${uxp.host.name} (버전: ${uxp.host.version})`)
      } else {
        setMessage('호스트 정보를 가져올 수 없습니다.')
      }
    } catch (error) {
      setMessage(`오류가 발생했습니다: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGetHostInfo = async () => {
    setIsLoading(true)
    try {
      let hostInfo = 'UXP 정보:\n'

      if (uxp.host) {
        hostInfo += `- 호스트: ${uxp}\n`
        hostInfo += `- 버전: ${uxp.host.version}\n`
        hostInfo += `- UI 로케일: ${uxp.host.uiLocale}\n`
      }

      if (uxp.versions) {
        hostInfo += `- UXP 버전: ${uxp.versions.uxp}\n`
        hostInfo += `- 플러그인 버전: ${uxp.versions.plugin}\n`
      }

      setMessage(hostInfo)
    } catch (error) {
      setMessage(`오류가 발생했습니다: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <header className="flex flex-col gap-2 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            UXP Premiere Pro Plugin
          </h1>
          <p className="text-gray-600">
            Adobe Premiere Pro용 UXP 플러그인 샘플
          </p>
        </header>
        <main className="space-y-6">
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              프로젝트 정보
            </h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleGetProjectInfo}
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {isLoading ? '로딩 중...' : '프로젝트 정보 가져오기'}
                </button>
                <button
                  type="button"
                  onClick={handleGetHostInfo}
                  disabled={isLoading}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                  {isLoading ? '로딩 중...' : '호스트 정보 가져오기'}
                </button>
              </div>
              {projectInfo && (
                <div className="bg-gray-50 rounded-md p-4">
                  <h3 className="font-medium text-gray-700 mb-2">현재 프로젝트:</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><span className="font-medium">이름:</span> {projectInfo.name}</p>
                    <p><span className="font-medium">경로:</span> {projectInfo.path}</p>
                    <p><span className="font-medium">길이:</span> {projectInfo.duration}초</p>
                  </div>
                </div>
              )}
            </div>
          </section>
          {message && (
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mt-4">
              <pre className="text-blue-800 whitespace-pre-wrap">{message}</pre>
            </div>
          )}
        </main>
        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>Adobe UXP Premiere Pro Plugin Sample</p>
        </footer>
      </div>
    </div>
  )
}

export default App
