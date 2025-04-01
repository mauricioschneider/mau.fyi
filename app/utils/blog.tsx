export function getPostList() {
  return [
    {
      id: 'interviewing-for-talent',
    },
    {
      id: 'diversity-and-inclusion-in-decision-making'
    },
    {
      id: 'coaching-through-effective-questioning'
    },
    {
      id: 'empowering-teams-through-mission-purpose-and-values'
    },
    {
      id: 'abc-of-leadership-always-be-caring'
    },
    {
      id: 'the-pyramid-of-lencioni-the-path-to-trustable-committed-and-effective-teams'
    },
    {
      id: 'https-and-the-false-sense-of-security'
    },
    {
      id: 'legality-of-pentesting-and-vulnerability-research'
    },
    {
      id: 'write-up-tryhackmes-mr-robot-ctf'
    },
    {
      id: 'cryptographic-functions-a-key-decision-in-software-security-strategy'
    },
    {
      id: 'understanding-pseudo-random-numbers-vs-cryptographically-secure-pseudo-random-numbers'
    },
    {
      id: 'threat-modeling-an-essential-practice-for-secure-software-development'
    },
    {
      id: 'using-proton-mail-as-email-server-in-bluesky-pds'
    }
  ]
}

export function formatAuthors(authors: Array<string>) {
  if (!authors.length) {
    return 'Mauricio Schneider'
  }

  if (authors.length === 1) {
    return authors[0]
  }

  if (authors.length === 2) {
    return authors.join(' and ')
  }

  return authors.slice(0, -1).join(', ') + ', and ' + authors.slice(-1)
}
