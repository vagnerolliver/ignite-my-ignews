import { useSession, signIn } from 'next-auth/client';

import { getStripeJs } from '../../services/stripe-js';
import { api } from '../../services/axios';

import styles from './styles.module.scss';
interface SubscribeButtonProps {
  priceId: string
}

export function SubscribeButton({ priceId }: SubscribeButtonProps){
  const [session] = useSession()

  async function handleSubscribe(){
    if(!session) {
      signIn('github')
      return
    }

    try { 
      const { data } = await api.post('/subscribe')
      const { sessionId } = data
      
      const stripe = await getStripeJs()

      await stripe.redirectToCheckout({ sessionId })
       
    } catch(error) {
      alert(error.message)
    }
  }

  return (
    <button 
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  );
}