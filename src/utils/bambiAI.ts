// Bambi Empathetic AI Companion Engine
// Compassionate, culturally-aware, zero-log listening for Moses & Ugandan youth

export interface BambiAIResponse {
  reply: string;
  sentiment: 'heavy' | 'anxious' | 'neutral' | 'calm' | 'positive' | 'urgent';
  suggestedAction?: 'breathe' | 'peermatch' | 'myspace' | 'soundscape';
}

export function generateBambiAIResponse(
  message: string, 
  mode: 'vent' | 'think' | 'gentle' = 'vent', 
  userAlias: string = 'Moses'
): BambiAIResponse {
  const text = message.toLowerCase().trim();

  // Safety / Crisis Check
  const crisisKeywords = ['suicide', 'kill myself', 'end my life', 'want to die', 'harm myself'];
  if (crisisKeywords.some(k => text.includes(k))) {
    return {
      reply: `${userAlias}, I hear how deeply exhausted and in pain you are right now, but please know you don't have to carry this alone. There are people in Uganda ready to hold space for you right this second. Please reach out to the toll-free Lifeline at 0800 21 21 21 (Butabika) or Sauti 116. Your life is precious. Tap the red Urgent Help button at any moment.`,
      sentiment: 'urgent',
      suggestedAction: 'peermatch'
    };
  }

  // Work / Study / Burnout
  if (text.includes('tired') || text.includes('exhausted') || text.includes('burnout') || text.includes('work') || text.includes('deadline') || text.includes('stress')) {
    if (mode === 'vent') {
      return {
        reply: `I hear you loud and clear, ${userAlias}. It sounds like you've been running on empty while trying to keep all the plates spinning. You don't have to be productive in this moment. Lay that heavy backpack down right here. What has been draining your energy the most today?`,
        sentiment: 'heavy',
        suggestedAction: 'breathe'
      };
    } else if (mode === 'think') {
      return {
        reply: `When mental exhaustion sets in, everything feels equally urgent. If you could take just one task off your plate today without the world falling apart, which one would give you the most breathing room right now?`,
        sentiment: 'neutral'
      };
    } else {
      return {
        reply: `You have pushed so hard, ${userAlias}. Please give yourself credit for showing up even when you felt depleted. Tonight, let "good enough" be enough. Take three slow breaths with me.`,
        sentiment: 'calm',
        suggestedAction: 'breathe'
      };
    }
  }

  // Anxiety / Overwhelm / Racing thoughts
  if (text.includes('anxious') || text.includes('worried') || text.includes('scared') || text.includes('panic') || text.includes('overwhelm') || text.includes('can\'t sleep')) {
    if (mode === 'vent') {
      return {
        reply: `Anxiety is such an uncomfortable visitor—it makes the chest tight and the mind race into tomorrow. You are safe right now in this little room. Take your time, ${userAlias}. What is the worry saying to you?`,
        sentiment: 'anxious',
        suggestedAction: 'breathe'
      };
    } else if (mode === 'think') {
      return {
        reply: `Let's gently separate what is happening *right now* from what your mind is anticipating might happen later. Out of everything worrying you, is there any piece you have direct control over in the next hour?`,
        sentiment: 'neutral'
      };
    } else {
      return {
        reply: `Put both feet flat on the floor, ${userAlias}. Notice the ground holding you up without any effort on your part. You don't have to figure out the whole story today. Just this one breath.`,
        sentiment: 'calm',
        suggestedAction: 'soundscape'
      };
    }
  }

  // Relationships / Loneliness / Heart
  if (text.includes('lonely') || text.includes('alone') || text.includes('friend') || text.includes('relationship') || text.includes('heartbreak') || text.includes('family')) {
    if (mode === 'vent') {
      return {
        reply: `Feeling disconnected or misunderstood by the people around us is one of the loneliest experiences there is. Even in a crowded room or a busy city, that ache is real. I'm sitting right beside you here. What happened?`,
        sentiment: 'heavy',
        suggestedAction: 'peermatch'
      };
    } else if (mode === 'think') {
      return {
        reply: `Relationships can carry so many unspoken expectations. Are you carrying the emotional weight of trying to manage someone else's reaction, or is there a boundary you wish you could voice?`,
        sentiment: 'neutral'
      };
    } else {
      return {
        reply: `You are worthy of genuine warmth, care, and being listened to without conditions, ${userAlias}. Never let temporary isolation convince you that you don't matter. You do.`,
        sentiment: 'calm'
      };
    }
  }

  // Money / Finances / UGX
  if (text.includes('money') || text.includes('rent') || text.includes('bills') || text.includes('broke') || text.includes('finance') || text.includes('ugx')) {
    return {
      reply: `Financial pressure is so visceral—it affects our sleep, our peace of mind, and our self-esteem. In Uganda especially, navigating economic hurdles can feel like climbing uphill in the rain. Your financial situation does not define your worth as a human being. How can we make today a little more gentle on your spirit?`,
      sentiment: 'heavy',
      suggestedAction: 'myspace'
    };
  }

  // Good vibes / Gratitude
  if (text.includes('good') || text.includes('happy') || text.includes('great') || text.includes('grateful') || text.includes('thank') || text.includes('better')) {
    return {
      reply: `That brings such warmth to my heart, ${userAlias}! 🌸 In a busy world, taking a moment to acknowledge goodness is a real act of self-care. What made you smile or feel lighter today?`,
      sentiment: 'positive',
      suggestedAction: 'myspace'
    };
  }

  // Default compassionate responses based on mode
  if (mode === 'vent') {
    const ventOptions = [
      `I am listening with an open heart, ${userAlias}. Say whatever needs to be said. You don't have to filter your thoughts or make them sound polite here.`,
      `Thank you for sharing that with me. It takes real courage to be honest about where you are at. I'm right here. What else is on your mind?`,
      `I hear the weight behind those words. Take a deep, gentle breath. You don't have to carry this completely alone.`
    ];
    return {
      reply: ventOptions[Math.floor(Math.random() * ventOptions.length)],
      sentiment: 'neutral'
    };
  } else if (mode === 'think') {
    const thinkOptions = [
      `That is a really thoughtful reflection, ${userAlias}. When you look at the situation, what feels like the most honest truth, even if it feels uncomfortable to admit?`,
      `Let's unpack that slowly. What outcome are you hoping for most deeply here?`,
      `If a dear friend came to you with this exact dilemma, what kind of patience or advice would you offer them?`
    ];
    return {
      reply: thinkOptions[Math.floor(Math.random() * thinkOptions.length)],
      sentiment: 'neutral'
    };
  } else {
    const gentleOptions = [
      `Breathe in peace, breathe out the noise. You are doing the best you can in this season, ${userAlias}. Be gentle with your mind today.`,
      `Remember that healing and progress aren't linear. Having a quiet or uncertain day is just part of being human. Bambi is right here with you.`,
      `You don't need all the answers right now. Taking care of your spirit today is more than enough.`
    ];
    return {
      reply: gentleOptions[Math.floor(Math.random() * gentleOptions.length)],
      sentiment: 'calm'
    };
  }
}
