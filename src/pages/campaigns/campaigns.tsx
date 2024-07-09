import Campaign from 'components/pages/campaigns/campaign'
export default function Page(props) {
  if (props.justHead) {
    return <></>
  }
  return <Campaigns {...props} />
}
function Campaigns() {
  return (
    <>
      <div className='page-content bg-gray-50'>
        <Campaign />
      </div>
    </>
  )
}
