const stripePromise = loadStripe('pk_test_123');

const App = ({fetchClientSecret}) => {
  const options = {fetchClientSecret};

  const [isComplete, setIsComplete] = useState(false);

  const handleComplete = () => setIsComplete(true);

  return isComplete ? (
    <PurchaseSummary />
  ) : (
    <EmbeddedCheckoutProvider
      stripe={stripePromise}
      options={{
        ...options,
        onComplete: handleComplete
      }}
    >
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  )
}