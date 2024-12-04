import { useEffect, useState } from "react"
import companyService from "../../services/companyService"
import { useAuth } from "../../hooks/useAuth"
import { Company } from "../../types"

const CompanyPage = () => {
  const [company, setCompany] = useState<Company | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const { user } = useAuth()

  useEffect(() => {
    const fetchCompany = async () => {
      if (user) {
        try {
          const token = await user.getIdToken(true)
          const companyResponse = await companyService.getCompany(token as string)
          setCompany(companyResponse)
        } catch (error) {
          console.error('Error fetching company (Component: CompanyPage)', error)
        } finally {
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }
    fetchCompany()
  }, [user])

  if (loading) return <div>Loading...</div>
  if (!company) return <div>You are not associated with a company.</div>

  return (
    <div>
      {company.name}
    </div>
  )
}

export default CompanyPage