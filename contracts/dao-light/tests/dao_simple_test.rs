use codec::Encode;
use dao_io::*;
use ft_io::*;
use gtest::{Program, System};
const MEMBERS: &'static [u64] = &[3, 4, 5];

fn init_fungible_token(sys: &System) {
    sys.init_logger();
    let ft = Program::from_file(
        &sys,
        "../fungible-token/target/wasm32-unknown-unknown/release/fungible_token.wasm",
    );

    let res = ft.send(
        100001,
        InitConfig {
            name: String::from("MyToken"),
            symbol: String::from("MTK"),
        },
    );

    assert!(res.log().is_empty());
    MEMBERS.iter().enumerate().for_each(|(_, member)| {
        let res = ft.send(*member, Action::Mint(10000000));
        assert!(!res.main_failed());
    });
}

fn init_dao(sys: &System) {
    sys.init_logger();
    let dao = Program::current(&sys);
    let res = dao.send(
        100001,
        InitDao {
            admin: 3.into(),
            approved_token_program_id: 1.into(),
            period_duration: 10000000,
            voting_period_length: 100000000,
        },
    );
    assert!(res.log().is_empty());
}

fn deposit(dao: &Program, member: u64, amount: u128) {
    let res = dao.send(member, DaoAction::Deposit { amount });
    assert!(!res.main_failed());
}

fn proposal(dao: &Program, member: u64, amount: u128) {
    let res = dao.send(
        member,
        DaoAction::SubmitFundingProposal {
            applicant: 20.into(),
            amount,
            quorum: 80,
            details: "Funding proposal".to_string(),
        },
    );
    assert!(res.contains(&(
        member,
        DaoEvent::SubmitFundingProposal {
            proposer: member.into(),
            applicant: 20.into(),
            proposal_id: 0,
            amount,
        }
        .encode()
    )));
}

fn vote(dao: &Program, proposal_id: u128, vote: Vote) {
    let res = dao.send(
        3,
        DaoAction::SubmitVote {
            proposal_id: proposal_id.clone(),
            vote: vote.clone(),
        },
    );
    assert!(res.contains(&(
        3,
        DaoEvent::SubmitVote {
            account: 3.into(),
            proposal_id: proposal_id.clone(),
            vote: vote.clone(),
        }
        .encode()
    )));
}

#[test]
fn deposit_tokens() {
    let sys = System::new();
    init_fungible_token(&sys);
    init_dao(&sys);
    let dao = sys.get_program(2);
    deposit(&dao, 4, 1000);
}

#[test]
fn create_proposal() {
    let sys = System::new();
    init_fungible_token(&sys);
    init_dao(&sys);
    let dao = sys.get_program(2);
    deposit(&dao, 4, 1000);
    proposal(&dao, 4, 800);
}

#[test]
fn create_proposal_failures() {
    let sys = System::new();
    init_fungible_token(&sys);
    init_dao(&sys);
    let dao = sys.get_program(2);

}

// #[test]
// fn vote_on_proposal_failures() {
//     let sys = System::new();
//     init_fungible_token(&sys);
//     init_dao(&sys);

//     let dao = sys.get_program(2);
//     create_membership_proposal(&dao, 0);
//     // must fail since the proposal does not exist
//     let res = dao.send(
//         3,
//         DaoAction::SubmitVote {
//             proposal_id: 1,
//             vote: Vote::Yes,
//         },
//     );
//     assert!(res.main_failed());

//     //must fail since the account is not delegate
//     let res = dao.send(
//         4,
//         DaoAction::SubmitVote {
//             proposal_id: 0,
//             vote: Vote::Yes,
//         },
//     );
//     assert!(res.main_failed());

//     sys.spend_blocks(1000000001);
//     // must fail since the voting period has expired
//     let res = dao.send(
//         3,
//         DaoAction::SubmitVote {
//             proposal_id: 0,
//             vote: Vote::Yes,
//         },
//     );
//     assert!(res.main_failed());

//     create_membership_proposal(&dao, 1);
//     create_membership_proposal(&dao, 2);
//     // must fail since the voting period has not started
//     let res = dao.send(
//         3,
//         DaoAction::SubmitVote {
//             proposal_id: 2,
//             vote: Vote::Yes,
//         },
//     );
//     assert!(res.main_failed());
// }

// #[test]
// fn vote_on_proposal() {
//     let sys = System::new();
//     init_fungible_token(&sys);
//     init_dao(&sys);

//     let dao = sys.get_program(2);
//     create_membership_proposal(&dao, 0);
//     vote(&dao, 0, Vote::Yes);

//     // must fail since the account has already voted
//     let res = dao.send(
//         3,
//         DaoAction::SubmitVote {
//             proposal_id: 0,
//             vote: Vote::Yes,
//         },
//     );
//     assert!(res.main_failed());
// }

// #[test]
// fn process_proposal() {
//     let sys = System::new();
//     init_fungible_token(&sys);
//     init_dao(&sys);

//     let dao = sys.get_program(2);
//     create_membership_proposal(&dao, 0);
//     vote(&dao, 0, Vote::Yes);

//     let dao = sys.get_program(2);
//     // must fail since voting period is not over
//     let res = dao.send(3, DaoAction::ProcessProposal(0));
//     assert!(res.main_failed());

//     sys.spend_blocks(1000000001);
//     let res = dao.send(3, DaoAction::ProcessProposal(0));
//     assert!(res.contains(&(
//         3,
//         DaoEvent::ProcessProposal {
//             applicant: 4.into(),
//             proposal_id: 0,
//             did_pass: true,
//         }
//         .encode()
//     )));

//     create_membership_proposal(&dao, 1);
//     vote(&dao, 1, Vote::No);
//     sys.spend_blocks(1000000001);
//     let res = dao.send(3, DaoAction::ProcessProposal(1));
//     assert!(res.contains(&(
//         3,
//         DaoEvent::ProcessProposal {
//             applicant: 4.into(),
//             proposal_id: 1,
//             did_pass: false,
//         }
//         .encode()
//     )));
// }





